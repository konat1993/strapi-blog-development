'use strict'

const projectSchema = require('./project-schema')

module.exports = {
    // project key is important because in content types we have to name
    // singular name value the same as this key below
    project: { schema: projectSchema }
}
