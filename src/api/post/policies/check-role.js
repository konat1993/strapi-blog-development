'use strict'

/**
 * `check-role` policy.
 */

module.exports = (policyContext, config, { strapi }) => {
  console.log('config: ', config)
  const { userRole } = config
  const isEligible = policyContext.state.user && policyContext.state.user.role.code === userRole // 'Administrator'

  // Add your own logic here.
  // strapi.log.info('In is-admin policy mate.')
  console.log('policy', policyContext.state)
  console.log('iseliglable', isEligible)
  if (isEligible) {
    return true
  }

  return false
}
