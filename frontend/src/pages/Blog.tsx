import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogCard";
import Appbar from "../components/Appbar";
import Skeleton from "../components/Skeleton";

function Blog() {
  const { id } = useParams();

  const { blog, loading } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <Appbar type="others" />
      <div className="p-10 grid grid-cols-12">
        <div className="col-span-8">
          <div className="font-bold text-[40px]">{blog.title}</div>
          <div className="font-extralight text-sm">
            Posted on {"05 nov 2023"}
          </div>
          <div className="font-light text-md">{blog.content}s</div>
        </div>
        <div className="col-span-4">
          <div className="font-extrabold text-2xl">Author</div>
          <div className="flex gap-2">
            <Avatar name={blog.author.name} />
            <div>
              <div className="font-bold text-lg text-slate-700">
                {blog.author.name}
              </div>
              <div className="font-light">
                Master of mirth, purveyor of puns,and the funniest person in the
                kingdom
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
