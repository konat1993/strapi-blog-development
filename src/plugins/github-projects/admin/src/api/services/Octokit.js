import { useQuery, useMutation, useQueryClient } from "react-query"
import instance from '../../utils/axiosInstance'

export default {
    useGithub: () => {
        return useQuery('github-repos', async () => {
            const response = await instance.get('/github-projects/repos')
            console.log('stale')
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
    }
}


