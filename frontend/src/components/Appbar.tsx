import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
const Appbar = ({ type }: { type: "others" | "create" }) => {
  const navigate = useNavigate();
  return (
    <div className="px-10 py-6 flex justify-between border-b">
      <Link to={"/blogs"}>
        <div className="font-extrabold text-3xl">Medium</div>
      </Link>
      <div>
        {type === "others" ? (
          <button
            onClick={() => {
              navigate("/publish");
            }}
            className="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Publish
          </button>
        ) : null}
        <Avatar name={"Anonymous"} />
      </div>
    </div>
  );
};

export default Appbar;
