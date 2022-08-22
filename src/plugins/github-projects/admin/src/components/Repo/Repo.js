import React from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, BaseCheckbox, Typography, Loader, Alert, Flex, IconButton, Link } from '@strapi/design-system'
import { Pencil, Trash, Plus } from '@strapi/icons'
import Octokit from '../../api/services/Octokit'
import styled from 'styled-components'

const COL_COUNT = 5

const DescriptionTd = styled(Td)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
`


const Repo = () => {
    const { data: repos, isLoading, isError, error, status } = Octokit.useGithub()

    if (isLoading) return <Loader style={{ textAlign: 'center', marginTop: '30px' }}>{''}</Loader>
    if (isError) return <Alert
        closeLabel='Close alert'
        title='Error fetching repositories'
        variant='danger'
    >
        {error.response?.data?.error?.message || error.message}
    </Alert>
    console.log('state ', status)
    console.log('data ', repos)
    return (
        <Box padding={8} background="neutral100">
            <Table colCount={COL_COUNT} rowCount={repos.length}>
                <Thead>
                    <Tr>
                        <Th>
                            <BaseCheckbox aria-label="Select all entries" />
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
                                    <BaseCheckbox aria-label={`Select ${id}`} />
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
                                    {projectId ?
                                        <Flex>
                                            <Link to={`/content-manager/collectionType/plugin::github-projects.project/${projectId}`}>
                                                <IconButton label="Edit" noBorder icon={<Pencil />} />
                                            </Link>
                                            <Box paddingLeft={1}>
                                                <IconButton label="Delete" noBorder icon={<Trash />} />
                                            </Box>
                                        </Flex> :
                                        <IconButton label="Add" noBorder icon={<Plus />} />
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