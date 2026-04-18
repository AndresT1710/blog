const express = require("express");
const router = express.Router();

const{
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById
} = require ("../controllers/postsController");

router.get("/",getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;

