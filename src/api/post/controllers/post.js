'use strict'

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::post.post', ({ strapi }) => ({

    // 1st solution:
    // async find(ctx) {
    //     const { data, meta } = await super.find(ctx)
    //     if (ctx.state.user) {
    //         return { data, meta }
    //     } else {
    //         const filterNoPremiumPosts = data.filter(dataEl => !dataEl.attributes.premium)
    //         return { data: filterNoPremiumPosts, meta }
    //     }
    // }
    // 2nd solution (better than 1st one):
    // async find(ctx) {
    //     if (ctx.state.user) return await super.find(ctx)

    //     const filterNoPremiumPosts = await strapi.service('api::post.post').find({
    //         filters: {
    //             premium: false
    //         },
    //     })
    //     const sanitizedPosts = await this.sanitizeOutput(filterNoPremiumPosts, ctx)
    //     return this.transformResponse(sanitizedPosts)
    // }

    // 3rd solution (one of the best but not least):
    async find(ctx) {
        const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false // another case for user if he want to fetch only no premium posts
        if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)
        ctx.query = { ...ctx.query, filters: { ...ctx.query.filters, premium: false } }
        return await super.find(ctx)
    }
}))




