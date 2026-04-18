let posts = require("../data/posts");

// Obtener todos
const getPosts = (req, res) => {
  res.json(posts);
};

// Obtener por ID
const getPostById = (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ error: "No encontrado" });
  res.json(post);
};

// Crear
const createPost = (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    image
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

// Editar
const updatePost = (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) {
    return res.status(404).json({ error: "No encontrado" });
  }

  const { title, content, image } = req.body;

  post.title = title || post.title;
  post.content = content || post.content;
  post.image = image || post.image;

  res.json(post);
};

// Eliminar
const deletePost = (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.json({ message: "Eliminado" });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById
};