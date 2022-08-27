import React from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, BaseCheckbox, Typography, Loader, Alert, Flex, IconButton, Link } from '@strapi/design-system'
import { Pencil, Trash, Plus } from '@strapi/icons'
import styled from 'styled-components'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'
import { BulkActions } from '../BulkActions'
import { useReposContext } from '../../context'
import { alertContent } from '../../helpers/serializers'
import { useIntl } from 'react-intl'
import getTrad from '../../utils/getTrad'

const COL_COUNT = 5

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
    const {
        useGithub,
        useAddProject,
        useDeleteProject,
        useAddManyProjects,
        useDeleteManyProjects,
        selectedRepos,
        setSelectedRepos,
        alerts,
        setAlerts
    } = useReposContext()

    const { formatMessage } = useIntl()


    const [deletingProject, setDeletingProject] = React.useState(undefined)

    if (useGithub.isLoading) return <Loader style={{ textAlign: 'center', marginTop: '30px' }}>{''}</Loader>
    if (useGithub.isError) return <Alert
        closeLabel='Close alert'
        title='Error fetching repositories'
        variant='danger'
    >
        {(useGithub.error?.response?.data?.error?.message || useGithub.error?.message)}
    </Alert>

    const allChecked = useGithub.data.length === selectedRepos.length
    const isIndeterminate = useGithub.data.length > 0 && !allChecked // some repos selected but not all

    const isLoadingData = useGithub.isFetching || useAddProject.isLoading || useDeleteProject.isLoading || useAddManyProjects.isLoading || useDeleteManyProjects.isLoading

    const handleCreateClick = async (currentRepo) => {
        try {
            await useAddProject.mutateAsync(currentRepo)
            setAlerts([...alerts, alertContent('CREATE_ONE', { projectId: currentRepo.id }).success])
        } catch (error) {
            setAlerts([...alerts, alertContent('CREATE_ONE', { projectId: currentRepo.id, error }).error])
        }
    }
    const handleDeleteClick = async (projectId) => {
        try {
            await useDeleteProject.mutateAsync(projectId)
            setAlerts([...alerts, alertContent('DELETE_ONE', { projectId }).success])
        } catch (error) {
            setAlerts([...alerts, alertContent('DELETE_ONE', { projectId, error }).error])
        }
    }

    const closeHandler = (alertId) => {
        setAlerts(alerts.filter((alert, idx) => alertId !== idx))
    }

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
                        checkedRepos={
                            selectedRepos.map(
                                repoId => useGithub.data.find(repo => repo.id === repoId)
                            )
                        } />
                )
            }
            <Table colCount={COL_COUNT} rowCount={useGithub.data.length}>
                <Thead>
                    <Tr>
                        <Th>
                            <BaseCheckbox
                                aria-label="Select all entries"
                                indeterminate={isIndeterminate}
                                value={allChecked}
                                onValueChange={value => value ? setSelectedRepos(useGithub.data.map(repo => repo.id)) : setSelectedRepos([])}
                            />
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                {formatMessage({
                                    id: getTrad('repo.name')
                                })}
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                {formatMessage({
                                    id: getTrad('repo.description'),
                                    defaultMessage: 'Description'
                                })}
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                {formatMessage({
                                    id: getTrad('repo.url'),
                                    defaultMessage: 'Url'
                                })}
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                {formatMessage({
                                    id: getTrad('repo.actions'),
                                    defaultMessage: 'Actions'
                                })}
                            </Typography>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {useGithub.data.map(repo => {
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
                                                        disabled={isLoadingData}
                                                        label="Edit"
                                                        noBorder
                                                        icon={<Pencil />}
                                                    />
                                                </Link>
                                                <Box paddingLeft={1}>
                                                    <IconButton
                                                        disabled={isLoadingData}
                                                        label="Delete"
                                                        noBorder
                                                        onClick={() => setDeletingProject(projectId)}
                                                        icon={<Trash />}
                                                    />
                                                </Box>
                                            </Flex> :
                                            <IconButton
                                                disabled={isLoadingData}
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