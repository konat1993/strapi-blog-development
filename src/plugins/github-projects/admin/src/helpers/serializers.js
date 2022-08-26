const alertContent = (type, { projectId, response }) => {
    switch (type) {
        case 'CREATE_ONE': return {
            success: {
                title: 'Project created',
                message: `Successfully created project ${projectId}`,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error creating the project. Please retry',
                variant: 'danger'
            }
        }
        case 'DELETE_ONE': return {
            success: {
                title: 'Project deleted',
                message: `Successfully deleted project ${projectId}`,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error deleting the project. Please retry',
                variant: 'danger'
            }
        }
        case 'CREATE_MANY': return {
            success: {
                title: 'Projects created',
                message: `Successfully created ${response.length > 1 ? response.length + ' projects' : response.length + ' project'} `,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error creating projects. Please retry',
                variant: 'danger'
            }
        }
        case 'DELETE_MANY': return {
            success: {
                title: 'Projects deleted',
                message: `Successfully deleted ${response.length > 1 ? response.length + ' projects' : response.length + ' project'} `,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error deleting projects. Please retry',
                variant: 'danger'
            }
        }

        default: { }
    }
}

export { alertContent }