module.exports = [
  {
    method: 'GET',
    path: '/repos',  //=> available at route: //localhost:1337/github-projects/repos
    handler: 'getReposController.index',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
      // auth: false, // this is temporary disabled for testing route. Later on we will handle authorized service for only admin panel users
    },
  },
  {
    method: 'POST',
    path: '/project',  //=> available at route: //localhost:1337/github-projects/repos
    handler: 'projectController.create',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'DELETE',
    path: '/project/:id',  //=> available at route: //localhost:1337/github-projects/repos
    handler: 'projectController.delete',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  }
];
