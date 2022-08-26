import { useQuery, useMutation, useQueryClient } from "react-query"
import instance from '../../utils/axiosInstance'

export default {
    useGithub: () => {
        return useQuery('github-repos', async () => {
            const response = await instance.get('/github-projects/repos')
            return response.data
        },
            { refetchOnWindowFocus: false }
        )
    },
    useAddProject: () => {
        const queryClient = useQueryClient()
        return useMutation(async (repo) => {
            const response = await instance.post('/github-projects/project', repo)
            return response.data
        },
            {
                enabled: false, refetchOnWindowFocus: false, onSuccess: () => {
                    queryClient.invalidateQueries('github-repos')
                },
            }
        )
    },
    useDeleteProject: () => {
        const queryClient = useQueryClient()
        return useMutation(async (projectId) => {
            const response = await instance.delete(`/github-projects/project/${projectId}`)
            return response.data
        },
            {
                enabled: false,
                refetchOnWindowFocus: false,
                onSuccess: () => {
                    queryClient.invalidateQueries('github-repos')
                },
            }
        )
    },
    useAddManyProjects: () => {
        const queryClient = useQueryClient()
        return useMutation(async (repos) => {
            const response = await instance.post('/github-projects/projects', { repos })
            return response.data
        },
            {
                enabled: false,
                refetchOnWindowFocus: false,
                onSuccess: () => {
                    queryClient.invalidateQueries('github-repos')
                },
            }
        )
    },
    useDeleteManyProjects: () => {
        const queryClient = useQueryClient()
        return useMutation(async (projectIds) => {
            console.log({projectIds})
            const response = await instance.delete('/github-projects/projects', {
                params: {
                    projectIds
                }
            })
            return response.data
        },
            {
                enabled: false,
                refetchOnWindowFocus: false,
                onSuccess: () => {
                    queryClient.invalidateQueries('github-repos')
                },
            }
        )
    }
}


