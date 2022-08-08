module.exports = {
    routes: [
        {
            method: "GET",
            path: "posts/example",
            handler: "myCustomController.example",
            config: {
                //some config
            }
        }
    ]
}