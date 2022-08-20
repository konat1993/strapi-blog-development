'use strict'

const { request } = require("@octokit/request")
const axios = require("axios")

module.exports = ({ strapi }) => ({
  getPublicRepos: async () => {
    const result = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    })
    // id, name, shortDescription, url, longDescription
    // https://raw.githubusercontent.com/konat1993/my-movies-platform/master/README.md
    return Promise.all(
      result.data.map(async (item) => {
        const { id, name, description, html_url: url, owner: { login }, default_branch: branch } = item
        try {
          const readmeUrl = `https://raw.githubusercontent.com/${login}/${name}/${branch}/README.md`
          const longDescription = (await axios.get(readmeUrl)).data
          return {
            id,
            name,
            shortDescription: description,
            url,
            longDescription
          }
        } catch (error) {
          // catch any error if repository is empty (does not exist)
          console.log({ error: { message: error.message } })
        }
      })
    )
  },
})
