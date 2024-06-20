import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <Skeleton />;
  }
  return (
    <div>
      <Appbar type="others" />
      <div className="mx-40 mt-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name}
            publishedDate="05 nov 03"
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
