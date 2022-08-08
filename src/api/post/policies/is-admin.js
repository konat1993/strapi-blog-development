'use strict';

/**
 * `is-admin` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info('In is-admin policy mate.');

    const canDoSomething = true;

    if (canDoSomething) {
      return true;
    }

    return false;
};
