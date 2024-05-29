"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";
import Loading from "../LoadingComp";
import Error from "../Error";
import { useRouter } from "next/navigation";
import Nav from "../Nav";

export default function Add() {
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const link = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col gap-[5vh] h-screen items-center justify-center mt-[-12vh]"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(
                "/api/posts",
                {
                  name: name.current?.value,
                  description: description.current?.value,
                  link: link.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                alert("Added");
                router.push("/home");
              })
              .catch((err) => {
                setError(err.response.data);
              });
          }}
        >
          {error && <Error error={error} />}
          <input
            type="text"
            className="input input-bordered"
            placeholder="Name"
            ref={name}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Description"
            ref={description}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Website Link"
            ref={link}
          />
          <button className="btn btn-neutral btn-wide">Add</button>
        </form>
      )}
    </>
  );
}
