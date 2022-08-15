module.exports = {
    routes: [
        {
            method: "PUT",
            path: "/posts/:id/dislike",
            handler: "api::post.post.dislikePost"
        }
    ]
}