"use client";

import { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../services/api";

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
}

interface PostForm {
  title: string;
  content: string;
  image: string;
  
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PostForm>({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    getPosts()
      .then((data: Post[]) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        const updated = await updatePost(editingId, form);
        setPosts(posts.map((p) => (p.id === editingId ? updated : p)));
        setEditingId(null);
      } else {
        const newPost = await createPost(form);
        setPosts([newPost, ...posts]);
      }

      setForm({ title: "", content: "", image: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (post: Post) => {
    setForm({
      title: post.title,
      content: post.content,
      image: post.image || "",
    });
    setEditingId(post.id);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📰 Blog de Noticias</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-xl mb-6 shadow">
        <h2 className="text-xl font-semibold mb-3">
          {editingId !== null ? "Editar Post" : "Crear Post"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Contenido"
          value={form.content}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId !== null ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition"
          >
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="rounded-xl mb-3 h-40 w-full object-cover"
              />
            )}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm mt-2">
              {post.content.slice(0, 80)}...
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}