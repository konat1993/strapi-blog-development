const alertContent = (type, { projectId, response, error }) => {
    const errorMessage = error?.toString()
    const errorStatusText = error?.response?.statusText
    switch (type) {
        case 'CREATE_ONE': return {
            success: {
                title: 'Project created',
                message: `Successfully created project ${projectId}`,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error creating the project: ' + errorStatusText || errorMessage,
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
                message: 'Error deleting the project: ' + errorStatusText || errorMessage,
                variant: 'danger'
            }
        }
        case 'CREATE_MANY': return {
            success: {
                title: 'Projects created',
                message: response && `Successfully created ${response.length > 1 ? response.length + ' projects' : response.length + ' project'} `,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error creating projects: ' + errorStatusText || errorMessage,
                variant: 'danger'
            }
        }
        case 'DELETE_MANY': return {
            success: {
                title: 'Projects deleted',
                message: response && `Successfully deleted ${response.length > 1 ? response.length + ' projects' : response.length + ' project'} `,
                variant: 'success'
            },
            error: {
                title: 'An error occurred',
                message: 'Error deleting projects: ' + errorStatusText || errorMessage,
                variant: 'danger'
            }
        }

        default: { }
    }
}

export { alertContent }