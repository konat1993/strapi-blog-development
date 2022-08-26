'use strict'

module.exports = ({ strapi }) => ({
    create: async (ctx) => {
        const repo = ctx.request.body
        const newProject = await strapi
            .plugin('github-projects')
            .service('projectService')
            .create(repo, ctx.state.user.id)

        return newProject
    },
    delete: async (ctx) => {
        const projectId = ctx.params.id
        const deletedProject = await strapi
            .plugin('github-projects')
            .service('projectService')
            .delete(projectId)

        return deletedProject
    },
    createMany: async (ctx) => {
        const { repos } = ctx.request.body
        const userId = ctx.state.user.id
        const createProjects = await strapi
            .plugin('github-projects')
            .service('projectService')
            .createMany(repos, userId)

        return createProjects
    },
    deleteMany: async (ctx) => {
        const { projectIds } = ctx.query
        const deletedProjects = await strapi
            .plugin('github-projects')
            .service('projectService')
            .deleteMany(projectIds)

        return deletedProjects
    }
})
