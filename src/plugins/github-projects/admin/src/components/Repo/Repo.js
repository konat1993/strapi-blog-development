import React from 'react'
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table'
import { Box, BaseCheckbox, Typography, Loader, Alert } from '@strapi/design-system'
import Octokit from '../../api/services/Octokit'

const COL_COUNT = 5
const ROW_COUNT = 6

const Repo = () => {
    const { data: repos, isLoading, isError, error } = Octokit.useGithub()

    if (isLoading) return <Loader style={{ textAlign: 'center', marginTop: '30px' }} />
    if (isError) return <Alert
        closeLabel='Close alert'
        title='Error fetching repositories'
        variant='danger'
    >
        {error.response?.data?.error?.message || error.message}
    </Alert>

    return (
        <Box padding={8} background="neutral100">
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
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
                        {/* <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Th> */}
                    </Tr>
                </Thead>
                {/* <Tbody>
              {entries.map(entry => <Tr key={entry.id}>
                  <Td>
                    <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Avatar src={entry.cover} alt={entry.contact} />
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.description}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.category}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{entry.contact}</Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                      <Box paddingLeft={1}>
                        <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>)}
            </Tbody> */}
            </Table>
        </Box>
    )
}

export default Repo