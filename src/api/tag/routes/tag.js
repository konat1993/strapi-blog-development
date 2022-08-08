'use strict';

/**
 * tag router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tag.tag', {
    prefix: '', // allows you to modify route e.g. if prefix: 'test' --> /test/tags
    only: ['find', 'findOne'], // allows you to disable some core routes to client e.g find and findOne are enabled but the rest (delete, create, update) are disabled
    except: [], // works the opposite way of "only" key (what you want to exclude)
    // So you  use either "only" or "except", NOT both at the same time.
    config: { // allows you to customize the existing routes more in depth
      find: {
        auth: false, // public (no JWT needed)
        policies: [],
        middlewares: [],
      },
      findOne: {},
      create: {},
      update: {},
      delete: {},
    },
  });
