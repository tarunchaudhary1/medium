import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="cursor-pointer mt-4">
        <div className="flex items-center ">
          <Avatar name={authorName} />
          <div className="mr-4">{authorName}</div>
          <div className="font-extralight text-slate-500">{publishedDate}</div>
        </div>
        <div className="font-bold text-[25px]">{title}</div>
        <div className="font-light text-md">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="font-extralight text-sm">
          {Math.ceil(content.length / 100)} minutes read
        </div>
        <div className="border-b-2"></div>
      </div>
    </Link>
  );
};
export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="mr-2 relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
};
export default BlogCard;
