'use strict'

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    // To make it work you have to create route for that e.q in post/routes/custom-route.js
    // And enable user to send request by making it public in role settings in Strapi admin settings
    async exampleAction(ctx) {
        await strapi.service('api::post.post').exampleService({myParam: 'example param'})
        try {
            ctx.body = 'ok'
        } catch (err) {
            ctx.body = err
        }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        // some custom logic here
        ctx.query = { ...ctx.query, local: 'en' }
        // console.log('query: ', ctx.query)
        // console.log('ctx: ', ctx)
        //example:
        // /api/posts?publicationState=preview:
        /*
        {publicationState: 'preview'}
        {publicationState: 'preview', local: 'en}
        It is transforming an incoming request: /api/posts?publicationState=preview&local=en
        */

        // Calling the default core action
        const { data, meta } = await super.find(ctx) //https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#extending-core-controllers
        // 'super' is calling core find action of the existing controller object also including our above modification


        // some more custom logic
        meta.date = Date.now()

        return { data, meta }
        // return {
        //     data: data.map(dataEl => ({ ...dataEl.attributes, id: dataEl.id })),
        //     meta
        // }
    },

    // Method 3: Replacing a core action
    async findOne(ctx) { // /api/posts/:id
        const { id } = ctx.params
        const { query } = ctx
        const entity = await strapi.service('api::post.post').findOne(id, query) //over-writing core findOne action
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

        return this.transformResponse(sanitizedEntity)
    }
}))
