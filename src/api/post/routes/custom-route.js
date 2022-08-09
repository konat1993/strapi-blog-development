module.exports = {
    routes: [
        {
            method: "GET",
            path: "/posts/example",
            handler: "api::post.post.exampleAction", //exampleAction is taken from post/controllers/post.js
            config: {
                //some config
            }
        }
    ]
}