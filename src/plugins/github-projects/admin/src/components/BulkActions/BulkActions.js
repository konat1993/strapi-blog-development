import React from 'react'
import { Box, Flex, Typography, Button } from '@strapi/design-system'

const BulkActions = ({ selectedRepos }) => {
    const reposWithoutProjects = selectedRepos.filter(repo => !repo.projectId)
    const reposWithProjects = selectedRepos.filter(repo => repo.projectId)
    const projectToBeCreated = reposWithoutProjects.length
    const projectToBeDeleted = reposWithProjects.length

    const handleCreateClick = () => {

    }
    const handleDeleteClick = () => {

    }

    return (
        <Box paddingBottom={4}>
            <Flex>
                <Typography>
                    You have {projectToBeCreated} projects to generate and {projectToBeDeleted} to delete
                </Typography>
                {
                    projectToBeCreated > 0 && (
                        <Box paddingLeft={2}>
                            <Button
                                size='small'
                                variant='success-light'
                                onClick={() => handleCreateClick}
                            >
                                {`Create ${projectToBeCreated} project(s)`}
                            </Button>
                        </Box>
                    )
                }
                {
                    projectToBeDeleted > 0 && (
                        <Box paddingLeft={2}>
                            <Button
                                size='small'
                                variant='danger-light'
                                onClick={() => handleDeleteClick}
                            >
                                {`Delete ${projectToBeDeleted} project(s)`}
                            </Button>
                        </Box>
                    )
                }
            </Flex>
        </Box>
    )
}

export { BulkActions }
