"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📰 Blog de Noticias
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(post => (
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
          </div>
        ))}
      </div>
    </div>
  );
}