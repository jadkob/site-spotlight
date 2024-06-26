"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { PostType } from "../types";
import Loading from "../LoadingComp";
import Error from "../Error";
import Link from "next/link";
import Nav from "../Nav";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  const fetchPosts = async () => {
    setLoading(true);
    await axios
      .get("/api/posts", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  const follow = async (userId: string) => {
    try {
      await axios.post(
        "/api/users/follow",
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      alert("Followed");
      setFollowedUsers([...followedUsers, userId]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} className="text-center mt-[30vh] text-[2.5rem]" />
      ) : (
        <div className="flex flex-col gap-[10vh] items-center justify-center mt-[15vh]">
          {posts.map((post) => (
            <div
              className="border border-solid w-fit p-[5vw] flex flex-col gap-[2vh]"
              key={post.id as string}
            >
              <div className="text-center">
                <Link href={`/user/${post.userId}`}>
                  <h1>Username: {post.username}</h1>
                </Link>
              </div>
              <h1 className="text-center">Website Name: {post.name}</h1>
              <div>
                <p className="text-center">
                  Website Description: {post.description}
                </p>
              </div>
              <Link
                href={`https://${post.link}`}
                target="_blank"
                className="flex items-center w-full"
              >
                <button className="btn btn-neutral btn-wide items-center">
                  Visit Website
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
