"use client";

import { useEffect, useState } from "react";
import { getPostById } from "../../../services/api";
import { useParams } from "next/navigation";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  if (!post) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {post.image && (
        <img
          src={post.image}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-700 leading-relaxed">
        {post.content}
      </p>
    </div>
  );
}