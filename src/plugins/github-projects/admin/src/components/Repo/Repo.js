import React from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, BaseCheckbox, Typography, Loader, Alert, Flex, IconButton, Link } from '@strapi/design-system'
import { Pencil, Trash, Plus } from '@strapi/icons'
import Octokit from '../../api/services/Octokit'
import styled from 'styled-components'

const COL_COUNT = 5

const alertContent = (project) => ({
    data: project,
    idle: null,
    success: project ? {
        title: 'Project created',
        message: `Successfully created project ${project.id}`,
        variant: 'success'
    } : null,
    error: {
        title: 'An error occurred',
        message: 'Error creating the project. Please retry',
        variant: 'danger'
    }
})

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

const createAlert = (status, alertContent, closeHandler) => {
    return (
        <Alert closeLabel='Close alert' onClose={closeHandler} title={alertContent[status].title} variant={alertContent[status].variant}>
            {alertContent[status].message}
        </Alert>
    )
}

const Repo = () => {
    const { data: repos, isLoading, isError, error, isFetching } = Octokit.useGithub()
    const {
        mutate: addProject,
        isLoading: isMutateLoading,
        status,
        data: project,
    } = Octokit.useAddProject()

    const [selectedRepos, setSelectedRepos] = React.useState([])
    const [open, setOpen] = React.useState(false)

    if (isLoading) return <Loader style={{ textAlign: 'center', marginTop: '30px' }}>{''}</Loader>
    if (isError) return <Alert
        closeLabel='Close alert'
        title='Error fetching repositories'
        variant='danger'
    >
        {error.response?.data?.error?.message || error.message}
    </Alert>

    const allChecked = repos.length === selectedRepos.length
    const isIndeterminate = repos.length > 0 && !allChecked // some repos selected but not all

    const createProject = async (currentRepo) => {
        addProject(currentRepo)
        setOpen(true)
    }

    const closeHandler = () => {
        setOpen(false)
    }
    return (
        <Box padding={8} background="neutral100">
            <AlertContainer>
                {(status === 'success' || status === 'error') && open && createAlert(status, alertContent(project), closeHandler)}
            </AlertContainer>
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
                                                        disabled={isFetching || isMutateLoading}
                                                        label="Edit"
                                                        noBorder
                                                        icon={<Pencil />}
                                                    />
                                                </Link>
                                                <Box paddingLeft={1}>
                                                    <IconButton
                                                        disabled={isFetching || isMutateLoading}
                                                        label="Delete"
                                                        noBorder
                                                        icon={<Trash />}
                                                    />
                                                </Box>
                                            </Flex> :
                                            <IconButton
                                                disabled={isFetching || isMutateLoading}
                                                label="Add"
                                                noBorder icon={<Plus />}
                                                onClick={() => createProject(repo)}
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

export default Repo