'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension')

    const extension = () => ({
      // GraphQL SDL
      // extends the existing types
      typeDefs: `
          type Mutation {
              likePost(id: ID!):  PostEntityResponse
          }
      `,
      // resolvers: {
      //   Query: {
      //     address: {
      //       resolve() {
      //         return { value: { city: 'Montpellier' } };
      //       },
      //     },
      //   },
      // },
      // resolversConfig: {
      //   'Query.address': {
      //     auth: false,
      //   },
      // },
    });
    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
