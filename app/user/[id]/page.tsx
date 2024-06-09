"use client";
import * as jwt from "jsonwebtoken";
import Error from "@/app/Error";
import Nav from "@/app/Nav";
import { PostType, UserType } from "@/app/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          "/api/users",
          { id },
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const decoded: any = jwt.decode(token as string);
      setUserId(decoded.id);
    }
  }, []);

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        "/api/users/follow",
        { userId: user?.id },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Failed to follow user:", err.response.data);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <Nav />
      <div>
        <h1>Username: {user?.username}</h1>
        {user?.followers && !user?.followers.includes(userId) && (
          <button onClick={handleFollow}>Follow</button>
        )}
        <h1>Followers: {user?.followers ? user.followers.length : 0}</h1>
        <h1>Following: {user?.following ? user.following.length : 0}</h1>
        <h1>Posts: </h1>
        {user?.posts && user.posts.length === 0 ? (
          <Error error="No Posts" />
        ) : (
          user?.posts?.map((post: PostType) => (
            <div key={post.id as string}>
              <h2>{post.name}</h2>
              <p>{post.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
