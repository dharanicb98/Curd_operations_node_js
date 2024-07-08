const postsRepo = require('../repo/postsRepo');

const getAllPosts = async () => {
  const data = await postsRepo.getAllPosts();
  return data;
}

const createPost = async ( payload ) => {
    const {title, body} = payload;

    if (!title) {
        throw new Error('Title is required')
    };
    if (!body) {
        throw new Error('Description is required')
    }

    const data = await postsRepo.createPost(title, body)
    return data

}

const updatePost = async (id, payload ) => {
    const {title, body} = payload;
    const data = await postsRepo.updatePost(title, body, id)
    return data
}

const deletePost = async ( id ) => {
    const data = await postsRepo.deletePost(id);
    return data
}

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
