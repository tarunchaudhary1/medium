import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    axios
      .get(`https://backend.tarunchaudhary630.workers.dev/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setBlog(res.data.blog);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get("https://backend.tarunchaudhary630.workers.dev/api/v1/blog/bulk", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setBlogs(res.data);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
