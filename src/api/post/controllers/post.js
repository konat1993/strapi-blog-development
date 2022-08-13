'use strict'

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::post.post', ({ strapi }) => ({

    // 1st solution:
    // async find(ctx) {
    //     if (ctx.state.user) {
    //         return { data, meta }
    //     const { data, meta } = await super.find(ctx)
    //     } else {
    //         const filterNoPremiumPosts = data.filter(dataEl => !dataEl.attributes.premium)
    //         return { data: filterNoPremiumPosts, meta }
    //     }
    // }
    // 2nd solution (better than 1st one):
    // async find(ctx) {
    //     const isRequestingNonPremium = ctx.query.filters &&
    //         ctx.query.filters.premium === false // another case for user if he want to fetch only no premium posts

    //     if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)

    //     const filterNoPremiumPosts = await strapi.service('api::post.post').find({
    //         ...ctx.query,
    //         filters: {
    //             ...ctx.query.filters,
    //             premium: false
    //         },
    //     })
    //     const sanitizedPosts = await this.sanitizeOutput(filterNoPremiumPosts, ctx)
    //     return this.transformResponse(sanitizedPosts)
    // }

    // 3rd solution (one of the best but not least):
    // async find(ctx) {
    //     const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false // another case for user if he want to fetch only no premium posts
    //     if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)
    //     ctx.query = { ...ctx.query, filters: { ...ctx.query.filters, premium: false } }
    //     return await super.find(ctx)
    // }

    async find(ctx) {
        const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false // another case for user if he want to fetch only no premium posts
        if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)

        const publicPosts = await strapi.service('api::post.post').findPublic(ctx.query) //findPublic will be implemented in services file

        const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx)
        return this.transformResponse(sanitizedPosts)
    },

    // async findOne(ctx) {
    //     const { id } = ctx.params
    //     if (ctx.state.user) return await super.findOne(ctx, id)

    //     const { data, meta } = await super.findOne(ctx, id)
    //     const publicPost = data.attributes.premium ? null : data
    //     return { data: publicPost, meta }
    // }

    async findOne(ctx) {
        const { id } = ctx.params
        const { query } = ctx

        if (ctx.state.user) return await super.findOne(ctx)

        const postIfPublic = await strapi.service('api::post.post').findOneIfPublic({ id, query })
        const sanitizedPost = await this.sanitizeOutput(postIfPublic, ctx)
        return this.transformResponse(sanitizedPost)
    }
}))




