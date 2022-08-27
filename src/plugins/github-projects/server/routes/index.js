module.exports = [
  {
    method: 'GET',
    path: '/repos',
    handler: 'getReposController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: [
              'plugin::github-projects.repos.read',
              'plugin::github-projects.projects.read'
            ]
          }
        }
      ],
      // auth: false, // this is temporary disabled for testing route. Later on we will handle authorized service for only admin panel users
    },
  },
  {
    method: 'POST',
    path: '/project',
    handler: 'projectController.create',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: 'admin::hasPermissions',
        config: {
          actions: [
            'plugin::github-projects.projects.create'
          ]
        }
      }],
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: 'admin::hasPermissions',
        config: {
          actions: [
            'plugin::github-projects.projects.delete'
          ]
        }
      }],
    },
  },
  {
    method: 'POST',
    path: '/projects',
    handler: 'projectController.createMany',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: 'admin::hasPermissions',
        config: {
          actions: [
            'plugin::github-projects.projects.create'
          ]
        }
      }],
    },
  },
  {
    method: 'DELETE',
    path: '/projects',
    handler: 'projectController.deleteMany',
    config: {
      policies: ['admin::isAuthenticatedAdmin', {
        name: 'admin::hasPermissions',
        config: {
          actions: [
            'plugin::github-projects.projects.delete'
          ]
        }
      }],
    },
  },
  {
    method: 'GET',
    path: '/projects',
    handler: 'projectController.find',
    config: {
        auth: false,
        // prefix: false // it allows you not to use in route 'github-projects' in this case. So it would be http://localhost:1337/projects
    },
  },
  {
    method: 'GET',
    path: '/projects/:id',
    handler: 'projectController.findOne',
    config: {
        auth: false
    },
  }
]
