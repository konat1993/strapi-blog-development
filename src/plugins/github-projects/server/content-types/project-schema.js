// path: ./src/plugins/my-plugin/server/content-types/content-type-a.js

module.exports = {
    kind: 'collectionType',
    collectionName: 'projects',
    info: {
        /*
        Singular name has to have the same name as content-type name which you can
        find in /content-types/index.js
        If you name that key in index.js e.g. 'projecter', the error will occur:
        Error: The key of the content-type should be the same as
        its singularName. Found project and projecter.
        */
        singularName: 'project', // kebab-case mandatory
        pluralName: 'projects', // kebab-case mandatory
        displayName: 'Project',
    },
    options: {
        draftAndPublish: false,
    },
    attributes: {
        repositoryId: {
            type: 'uid',
            unique: true
        },
        title: {
            type: 'string',
            required: true,
            unique: true
        },
        shortDescription: {
            type: 'string',
        },
        repositoryUrl: {
            type: 'string',
        },
        longDescription: {
            type: 'richtext',
        },
        coverImage: {
            type: 'media',
            allowedTypes: ['images'],
            multiple: false
        },
    }

    // default from strapi docs:
    // info: {
    //     tableName: 'content-type',
    //     singularName: 'content-type-a', // kebab-case mandatory
    //     pluralName: 'content-type-as', // kebab-case mandatory
    //     displayName: 'Content Type A',
    //     description: 'A regular content-type',
    //     kind: 'collectionType',
    // },
    // options: {
    //     draftAndPublish: true,
    // },
    // pluginOptions: {
    //     'content-manager': {
    //         visible: false,
    //     },
    //     'content-type-builder': {
    //         visible: false,
    //     }
    // },
    // attributes: {
    //     name: {
    //         type: 'string',
    //         min: 1,
    //         max: 50,
    //         configurable: false,
    //     },
    // }
}
