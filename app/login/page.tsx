"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { use, useRef, useState } from "react";
import Error from "../Error";
import Loading from "../LoadingComp";
import { useRouter } from "next/navigation";

export default function logIn() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-[3vh]">
        <form
          className="flex flex-col gap-[3vh] items-center"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            axios
              .post("/api/login", {
                username: username.current?.value,
                password: password.current?.value,
              })
              .then((res) => {
                setCookie("token", res.data);
                router.push("/home");
              })
              .catch((err) => {
                setError(err.response.data);
              })
              .finally(() => setLoading(false));
          }}
        >
          {error && <Error error={error} />}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              ref={username}
              placeholder="Username"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              placeholder="Password"
              type="password"
              ref={password}
              className="grow"
            />
          </label>
          <button className="btn btn-neutral btn-wide text-[1.3rem]">
            LogIn
          </button>
        </form>
      </div>
    </>
  );
}
