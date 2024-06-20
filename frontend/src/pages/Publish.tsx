import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Publish = () => {
  return (
    <div>
      <Appbar type="create" />
      <CreateBlog />
    </div>
  );
};
const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="mt-10 mx-20">
      <input
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        id="large-input"
        placeholder="Title for Blog"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
      ></input>
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button
        onClick={() => {
          axios.post(
            "https://backend.tarunchaudhary630.workers.dev/api/v1/blog",
            {
              title,
              content,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          navigate("/blogs");
        }}
        className=" mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 hover:bg-green-700 rounded-lg focus:ring-4 "
      >
        Publish post
      </button>
    </div>
  );
};
export default Publish;
