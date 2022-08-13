'use strict'

/**
 * post service.
 */

const { createCoreService } = require('@strapi/strapi').factories

module.exports = createCoreService('api::post.post', ({ strapi }) => ({
    async findPublic(args) {
        const newQuery = {
            ...args,
            filters: {
                ...args.filters,
                premium: false
            }
        }
        const publicPosts = await strapi.entityService.findMany('api::post.post', this.getFetchParams(newQuery))

        return publicPosts
    },

    async findOneIfPublic(args) {
        const { id, query } = args
        const post = await strapi.entityService.findOne('api::post.post', id, this.getFetchParams(query))
        const publicPost = post.premium ? null : post
        return publicPost
    }
}))
