"use client";

import { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../services/api";
import Link from "next/link";
import { translations } from "../lib/i18n";

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

  const [lang, setLang] = useState<"es" | "en">("es");
  const t = translations[lang];

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

if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse text-purple-300 text-xl">{t.loading}</div>
    </div>
  );


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      {/*Header*/}
      <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-400">
            Gala Importaciones
          </h1>
          <p className="text-orange-200/80 text-sm mt-1">{t.title}</p>
        </div>
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-orange-500/30 transition-all duration-300 font-medium"
        >
          {lang === "es" ? "🇺🇸 EN" : "🇪🇨 ES"}
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/10 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
          {editingId !== null ? t.editPost : t.createPost}
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder:text-white/50"
            required
          />
          <textarea
            name="content"
            placeholder="Contenido"
            value={form.content}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder:text-white/50"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="URL de imagen"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder:text-white/50"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
          >
            {editingId !== null ? t.editPost : t.createPost}
          </button>
        </div>
      </form>

      {/* Grid de tarjetas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer">
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-white line-clamp-1">{post.title}</h2>
                <p className="text-white-200/70 text-sm mt-2 line-clamp-2">
                  {post.content.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={(e) => { e.preventDefault(); handleEdit(post); }}
                    className="text-sm text-orange-300 hover:text-orange-100 transition flex items-center gap-1"
                  >
                    {t.edit}
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); handleDelete(post.id); }}
                    className="text-sm text-red-400 hover:text-red-300 transition flex items-center gap-1"
                  >
                    {t.delete}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer futurista */}
      <footer className="mt-16 text-center text-white/40 text-sm border-t border-white/10 pt-6">
        © {new Date().getFullYear()} Gala Importaciones Ecuador
      </footer>
    </div>
  );
}