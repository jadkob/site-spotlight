import * as jwt from "jsonwebtoken";
import { Post } from "../models/post";
import { PostType } from "@/app/types";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const decoded: any = jwt.decode(token);

    const posts = await Post.find({
      username: { $ne: decoded.username },
    }).sort({ createdAt: -1 });
    if (posts.length == 0)
      return new Response("No posts found", { status: 404 });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const body: PostType = await req.json();

    if (
      !body.name ||
      !body.description ||
      !body.link ||
      isEmpty([
        body.name as string,
        body.description as string,
        body.link as string,
      ])
    )
      return new Response("Invalid request", { status: 400 });

    const decoded: any = jwt.decode(token);

    const post = new Post({
      username: decoded.username,
      name: body.name,
      description: body.description,
      link: body.link,
      userId: decoded.id,
    });
    await post.save();

    return Response.json(post);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
