
const postsController = require('../modules/controllers/postsController')

const setUpRoutes = (app) => {
    app.use(`/posts`, postsController)
}

module.exports.setUpRoutes = setUpRoutes;