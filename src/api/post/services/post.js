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
    }
}))
