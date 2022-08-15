'use strict'

const likePost = require('../routes/like-post')

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false // another case for user if he want to fetch only no premium posts
        if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)

        const publicPosts = await strapi.service('api::post.post').findPublic(ctx.query) //findPublic will be implemented in services file

        const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx)
        return this.transformResponse(sanitizedPosts)
    },

    async findOne(ctx) {
        const { id } = ctx.params
        const { query } = ctx

        if (ctx.state.user) return await super.findOne(ctx)

        const postIfPublic = await strapi.service('api::post.post').findOneIfPublic({ id, query })
        const sanitizedPost = await this.sanitizeOutput(postIfPublic, ctx)
        return this.transformResponse(sanitizedPost)
    },

    async likePost(ctx) {
        // if(!ctx.state.user) {  // this is unnecessary because we have it already in strapi admin roles built-in
        //     return ctx.forbidden('Only authenticated users can like posts.')
        // }
        const user = ctx.state.user // user trying to like the post
        const postId = ctx.params.id // the post that's being "liked"
        const { query } = ctx // tracking queries from frontend requests (e.g. populate=*)
        // const updatedLikeInPost = await strapi.service("api::post.post").update({
        //     postId,
        //     userId: user.id,
        //     query
        // })
        const updatedLikePost = await strapi.service("api::post.post").likePost({
            postId,
            userId: user.id,
            query
        })
        const sanitizedEntity = await this.sanitizeOutput(updatedLikePost, ctx)
        return this.transformResponse(sanitizedEntity)
    },
     async dislikePost (ctx) {
        const user = ctx.state.user
        const postId = ctx.params.id
        const { query } = ctx

        const updateDislikePost = await strapi.service('api::post.post').dislikePost({
            postId,
            userId: user.id,
            query
        })
        const sanitizedEntity = await this.sanitizeOutput(updateDislikePost, ctx)
        return this.transformResponse(sanitizedEntity)
     }
}))




