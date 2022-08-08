'use strict';

/**
 * post router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post', {
    config: {
        find: {
            policies: [{name: 'check-role', config: {userRole: "Author"}}] // now our new policy is executed by this route
            // policies: ['api::tag.is-admin'] --> if we have another api e.q. tag er have to declare it like this
        }
    }
});
