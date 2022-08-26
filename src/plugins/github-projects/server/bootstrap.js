'use strict'

const RBAC_ACTIONS = [
  {
    // section and displayName control where the setting is shown
    section: 'plugins',
    displayName: 'View and access the plugin',

    // uid and pluginName control how you will reference these actions when you need it for a certain policy
    uid: 'use',
    pluginName: 'github-projects'
  },
  {
    section: 'plugins',
    subCategory: 'Repositories',
    displayName: 'Read Github repositories',
    uid: 'repos.read',
    pluginName: 'github-projects'
  },
  {
    section: 'plugins',
    subCategory: 'Project',
    displayName: 'Read project entities',
    uid: 'projects.read',
    pluginName: 'github-projects'
  },
  {
    section: 'plugins',
    subCategory: 'Project',
    displayName: 'Create project entities',
    uid: 'projects.create',
    pluginName: 'github-projects'
  },
  {
    section: 'plugins',
    subCategory: 'Project',
    displayName: 'Delete project entities',
    uid: 'projects.delete',
    pluginName: 'github-projects'
  }
]

module.exports = async ({ strapi }) => {
  // bootstrap phase
  await strapi.admin.services.permission.actionProvider.registerMany(RBAC_ACTIONS)
}
