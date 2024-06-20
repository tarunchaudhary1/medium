import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@tarun_0511/medium-blog";
import axios from "axios";

const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequests() {
    try {
      const response = await axios.post(
        `https://backend.tarunchaudhary630.workers.dev/api/v1/user/${
          type === "Signup" ? "signup" : "signin"
        }`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <div className="h-[500px] w-[500px] border-2 rounded-full border-zinc-950 flex justify-center items-center">
        <div className="pb-10 h-[300px] w-[270px]">
          <div className="text-2xl font-bold mt-2">
            {type === "Signin" ? "Login" : "Create an account"}
          </div>
          <div className="text-slate-600">
            {type === "Signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            {type === "Signin" ? (
              <Link className="pl-2 underline" to={"/Signup"}>
                Signup
              </Link>
            ) : (
              <Link className="pl-2 underline" to={"/"}>
                Login
              </Link>
            )}
          </div>
          {type === "Signup" ? (
            <InputBox
              label="Name"
              placeholder="John Doe"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <InputBox
            label="Email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />
          <InputBox
            label="Password"
            type="password"
            placeholder="********"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          <button
            onClick={sendRequests}
            className="bg-black ml-2 py-3 mt-4 text-white px-[100px] rounded-full"
          >
            {type}
          </button>
        </div>
      </div>
    </div>
  );
};

interface InputBoxProps {
  type?: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ type, label, placeholder, onChange }: InputBoxProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
