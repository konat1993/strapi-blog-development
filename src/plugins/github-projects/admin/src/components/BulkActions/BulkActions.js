import React from 'react'
import { Box, Flex, Typography, Button } from '@strapi/design-system'
import { useReposContext } from '../../context'
import { alertContent } from '../../helpers/serializers'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'

const BulkActions = ({ checkedRepos }) => {
    const {
        useGithub,
        useAddManyProjects,
        useDeleteManyProjects,
        setSelectedRepos,
        setAlerts,
        alerts
    } = useReposContext()

    const [deletingProjects, setDeletingProjects] = React.useState(undefined)

    const reposWithoutProjects = checkedRepos.filter(repo => !repo.projectId)
    const reposWithProjects = checkedRepos.filter(repo => repo.projectId)
    const projectsToBeCreated = reposWithoutProjects.length
    const projectsToBeDeleted = reposWithProjects.length

    const handleCreateClick = async (reposToBecomeProjects) => {
        const response = await useAddManyProjects.mutateAsync(reposToBecomeProjects)

        if (response) {
            setAlerts([...alerts, alertContent('CREATE_MANY', { response }).success])
        } else {
            setAlerts([...alerts, alertContent('CREATE_MANY', { response }).error])
        }
        setSelectedRepos([])

    }
    const handleDeleteClick = async (projectsToDelete) => {
        const projectIds = projectsToDelete.map(project => project.projectId)
        const response = await useDeleteManyProjects.mutateAsync(projectIds)

        if (response) {
            setAlerts([...alerts, alertContent('DELETE_MANY', { response }).success])
        } else {
            setAlerts([...alerts, alertContent('DELETE_MANY', { response }).error])
        }
        setSelectedRepos([])
    }
    console.log({ deletingProjects })
    return (
        <Box paddingBottom={4}>
            {deletingProjects && <ConfirmationDialog
                visible={!!deletingProjects}
                message='Are you sure you want to delete these projects?'
                onClose={() => setDeletingProjects(undefined)}
                onConfirm={() => handleDeleteClick(reposWithProjects)}
            />}
            <Flex>
                <Typography>
                    You have {projectsToBeCreated} projects to generate and {projectsToBeDeleted} to delete
                </Typography>
                {
                    projectsToBeCreated > 0 && (
                        <Box paddingLeft={2}>
                            <Button
                                size='S'
                                variant='success-light'
                                onClick={() => handleCreateClick(reposWithoutProjects)}
                                disabled={useAddManyProjects.isLoading || useGithub.isFetching}
                            >
                                {`Create ${projectsToBeCreated} project(s)`}
                            </Button>
                        </Box>
                    )
                }
                {
                    projectsToBeDeleted > 0 && (
                        <Box paddingLeft={2}>
                            <Button
                                size='S'
                                variant='danger-light'
                                onClick={() => setDeletingProjects(reposWithProjects)}
                                disabled={useAddManyProjects.isLoading || useGithub.isFetching}
                            >
                                {`Delete ${projectsToBeDeleted} project(s)`}
                            </Button>
                        </Box>
                    )
                }
            </Flex>
        </Box>
    )
}

export { BulkActions }
