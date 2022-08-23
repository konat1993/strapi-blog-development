import { useQuery, useMutation } from "react-query"
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
        return useMutation(async (repo) => {
            const response = await instance.post('/github-projects/project', repo)
            return response.data
        },
            { enabled: false, refetchOnWindowFocus: false }
        )
    }
}


