const express = require('express');
const postServices = require('../services/postsServices');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
       const data = await postServices.getAllPosts();
       res.status(200).send(data);
    }
    catch (e) {
        console.log('e',e)
        res.status(500).send({error:true, message:e?.message})
    }
});


router.post('/', async (req, res) => {
    try {
        let body = req.body
        const data = await postServices.createPost(body);
        res.status(200).send(data);
    }
    catch (e) {
        console.log('e',e)
        res.status(500).send({error:true, message:e?.message})
    }
});


router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id 
        let body = req.body
        const data = await postServices.updatePost(id, body);
        res.status(200).send(data)
    }
    catch (e) {
        console.log('e',e)
        res.status(500).send({error:true, message:e?.message})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const data = await postServices.deletePost(id);
        res.status(200).send({message: "post deleted successfully"});
    }
    catch (e) {
        console.log('e',e)
        res.status(500).send({error:true, message:e?.message})
    }
});

module.exports  = router