'use strict'

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx)

        if (ctx.state.user) {
            return { data, meta }
        } else {
            const filterNoPremiumPosts = data.filter(dataEl => !dataEl.attributes.premium)
            return { data: filterNoPremiumPosts, meta }
        }

    }
}))
