import React from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, BaseCheckbox, Typography, Loader, Alert, Flex, IconButton, Link } from '@strapi/design-system'
import { Pencil, Trash, Plus } from '@strapi/icons'
import styled from 'styled-components'
import Octokit from '../../api/services/Octokit'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'
import { BulkActions } from '../BulkActions'

const COL_COUNT = 5

const alertContent = (status, projectId) => {
    if (status === 'CREATE') return {
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
    if (status === 'DELETE') return {
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
}

const AlertContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-30%);
    top: 15px;
    z-index: 10;
    margin: 10px auto;
    width: fit-content;
`
const DescriptionTd = styled(Td)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
`

const Repo = () => {
    const { data: repos, isLoading, isError, error, isFetching } = Octokit.useGithub()
    const { mutateAsync: createProject, isLoading: isMutateLoading, } = Octokit.useAddProject()
    const { mutateAsync: deleteProject, isLoading: isDeleteLoading } = Octokit.useDeleteProject()

    const [selectedRepos, setSelectedRepos] = React.useState([])
    const [alerts, setAlerts] = React.useState([])
    const [deletingProject, setDeletingProject] = React.useState(undefined)

    if (isLoading) return <Loader style={{ textAlign: 'center', marginTop: '30px' }}>{''}</Loader>
    if (isError) return <Alert
        closeLabel='Close alert'
        title='Error fetching repositories'
        variant='danger'
    >
        {(error.response?.data?.error?.message || error.message)}
    </Alert>

    const allChecked = repos.length === selectedRepos.length
    const isIndeterminate = repos.length > 0 && !allChecked // some repos selected but not all

    const handleCreateClick = async (currentRepo) => {
        const response = await createProject(currentRepo)
        if (response) {
            setAlerts([...alerts, alertContent('CREATE', currentRepo.id).success])
        } else {
            setAlerts([...alerts, alertContent('CREATE', currentRepo.id).error])
        }
    }
    const handleDeleteClick = async (projectId) => {
        const response = await deleteProject(projectId)
        if (response) {
            setAlerts([...alerts, alertContent('DELETE', projectId).success])
        } else {
            setAlerts([...alerts, alertContent('DELETE', projectId).error])
        }
    }

    const closeHandler = (alertId) => {
        setAlerts(alerts.filter((alert, idx) => alertId !== idx))
    }
    console.log({ repos })
    return (
        <Box padding={8} background="neutral100">
            {deletingProject && (
                <ConfirmationDialog
                    visible={!!deletingProject}
                    message='Are you sure you want to delete this project?'
                    onClose={() => setDeletingProject(undefined)}
                    onConfirm={() => handleDeleteClick(deletingProject)}
                />
            )}
            <AlertContainer>
                {alerts.map((alert, alertId) => (
                    <Alert
                        key={alertId}
                        closeLabel='Close alert'
                        onClose={() => closeHandler(alertId)}
                        title={alert.title}
                        variant={alert.variant}
                    >
                        {alert.message}
                    </Alert>
                ))}
            </AlertContainer>
            {
                selectedRepos.length > 0 && (
                    <BulkActions
                        selectedRepos={
                            selectedRepos.map(
                                repoId => repos.find(repo => repo.id === repoId)
                            )
                        } />
                )
            }
            <Table colCount={COL_COUNT} rowCount={repos.length}>
                <Thead>
                    <Tr>
                        <Th>
                            <BaseCheckbox
                                aria-label="Select all entries"
                                indeterminate={isIndeterminate}
                                value={allChecked}
                                onValueChange={value => value ? setSelectedRepos(repos.map(repo => repo.id)) : setSelectedRepos([])}
                            />
                        </Th>
                        <Th>
                            <Typography variant="sigma">Name</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Description</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Url</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Actions</Typography>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {repos.map(repo => {
                        const { id, name, shortDescription, url, projectId } = repo
                        return (
                            <Tr key={id}>
                                <Td>
                                    <BaseCheckbox
                                        aria-label={`Select ${id}`}
                                        value={selectedRepos.includes(id)}
                                        onValueChange={value => {
                                            const newSelectedRepos = value ? [...selectedRepos, id] : selectedRepos.filter(repoId => repoId !== id)
                                            setSelectedRepos(newSelectedRepos)
                                        }}
                                    />
                                </Td>
                                <Td>
                                    <Typography textColor="neutral800">{name}</Typography>
                                </Td>
                                <DescriptionTd>
                                    <Typography textColor="neutral800">{shortDescription}</Typography>
                                </DescriptionTd>
                                <Td>
                                    <Typography textColor="neutral800">
                                        <Link href={url} isExternal>
                                            {url}
                                        </Link>
                                    </Typography>
                                </Td>
                                <Td>
                                    {
                                        projectId ?
                                            <Flex>
                                                <Link to={`/content-manager/collectionType/plugin::github-projects.project/${projectId}`}>
                                                    <IconButton
                                                        disabled={isFetching || isMutateLoading || isDeleteLoading}
                                                        label="Edit"
                                                        noBorder
                                                        icon={<Pencil />}
                                                    />
                                                </Link>
                                                <Box paddingLeft={1}>
                                                    <IconButton
                                                        disabled={isFetching || isMutateLoading || isDeleteLoading}
                                                        label="Delete"
                                                        noBorder
                                                        onClick={() => setDeletingProject(projectId)}
                                                        icon={<Trash />}
                                                    />
                                                </Box>
                                            </Flex> :
                                            <IconButton
                                                disabled={isFetching || isMutateLoading || isDeleteLoading}
                                                label="Add"
                                                noBorder icon={<Plus />}
                                                onClick={() => handleCreateClick(repo)}
                                            />
                                    }
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </Box>
    )
}

export { Repo }