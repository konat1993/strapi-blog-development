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
    },
    // this is an idea to trigger like or unlike posts (but i thing better solution it to create separate action i.e. dislikePost):
    // async likePost(args) {
    //     const { postId, userId, query } = args

    //     // use the underlying entity service API to fetch the post and, in particular, its likedBy property
    //     const { likedBy } = await strapi.entityService.findOne("api::post.post", postId, {
    //         populate: ["likedBy"]
    //     })
    //     let deleteElIndex = null
    //     let checkLikedBy = likedBy.map((el, id) => {
    //         return el.id === userId ? deleteElIndex = id : el
    //     })
    //     if (deleteElIndex === null) {
    //         checkLikedBy = checkLikedBy.concat(userId)
    //     } else {
    //         checkLikedBy.splice(deleteElIndex, 1)
    //     }
    //     // use the underlying entity service API to update the current post with the new relation
    //     const updatedPost = await strapi.entityService.update("api::post.post", postId, {
    //         data: {
    //             likedBy: checkLikedBy
    //         },
    //         ...query
    //     })
    //     return { data: updatedPost }
    // }

    // this is the case only for like post (without trigger to unlike):
    async likePost(args) {
        const { postId, userId, query } = args

        // use the underlying entity service API to fetch the post and, in particular, its likedBy property
        const { likedBy } = await strapi.entityService.findOne("api::post.post", postId, {
            populate: ["likedBy"]
        })

        // use the underlying entity service API to update the current post with the new relation
        const updatedPost = await strapi.entityService.update("api::post.post", postId, {
            data: {
                likedBy: [...likedBy, userId]
            },
            ...query
        })
        return { data: updatedPost }
    },
    async dislikePost(args) {
        const { postId, userId, query } = args

        // use the underlying entity service API to fetch the post and, in particular, its likedBy property
        const { likedBy } = await strapi.entityService.findOne("api::post.post", postId, {
            populate: ["likedBy"]
        })

        // use the underlying entity service API to update the current post with the new relation
        const updatedPost = await strapi.entityService.update("api::post.post", postId, {
            data: {
                likedBy: likedBy.filter(el => el.id !== userId)
            },
            ...query
        })
        return { data: updatedPost }
    }

}))
