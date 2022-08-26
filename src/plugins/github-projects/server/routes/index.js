module.exports = [
  {
    method: 'GET',
    path: '/repos',
    handler: 'getReposController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false, // this is temporary disabled for testing route. Later on we will handle authorized service for only admin panel users
    },
  },
  {
    method: 'POST',
    path: '/project',
    handler: 'projectController.create',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/projects',
    handler: 'projectController.createMany',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'DELETE',
    path: '/projects',
    handler: 'projectController.deleteMany',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  }
];
