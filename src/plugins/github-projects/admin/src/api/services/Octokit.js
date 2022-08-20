import { useQuery } from "react-query"
import instance from '../../utils/axiosInstance'

export default {
    useGithub: () => {
        return useQuery('github-repos', async () => {
            const response = await instance.get('/github-projects/repos')
            return response.data
        },
            { refetchOnWindowFocus: false }
        )
    }
}


