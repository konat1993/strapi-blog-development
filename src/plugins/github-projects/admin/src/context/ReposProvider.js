import React from 'react'
import Octokit from '../api/services/Octokit'

const ReposContext = React.createContext({
    useGithub: {},
    useAddProject: {},
    useDeleteProject: {},
    useAddManyProjects: {},
})

const ReposProvider = ({ children }) => {
    const useGithub = Octokit.useGithub()
    const useAddProject = Octokit.useAddProject()
    const useDeleteProject = Octokit.useDeleteProject()

    const useAddManyProjects = Octokit.useAddManyProjects()
    const useDeleteManyProjects = Octokit.useDeleteManyProjects()

    const [alerts, setAlerts] = React.useState([])

    const [selectedRepos, setSelectedRepos] = React.useState([])


    const state = {
        useGithub,
        useAddProject,
        useDeleteProject,
        useAddManyProjects,
        useDeleteManyProjects,
        selectedRepos,
        setSelectedRepos,
        alerts,
        setAlerts
    }

    return (
        <ReposContext.Provider value={state}>{children}</ReposContext.Provider>
    )
}

const useReposContext = () => React.useContext(ReposContext)

export { ReposProvider, useReposContext }