'use strict'

/**
 * `is-admin` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
  // policyContext -> have info about our user

  const isEligible = policyContext.state.user && policyContext.state.user.role.code === 'Administrator' // 'Administrator'

  // Add your own logic here.
  strapi.log.info('In is-admin policy mate.')
  console.log('policy', policyContext.state)
  console.log('iseliglable', isEligible)
  if (isEligible) {
    return true
  }

  return false
}
