'use strict'

/**
 * `timer-header` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const start = Date.now()

    await next()
    const delta = Math.ceil(Date.now() - start)
    strapi.log.info('In timer-header middleware.', delta)
    console.log({delta})
    ctx.set("X-Response-Time", delta + "ms")
  }
}
