import * as jwt from "jsonwebtoken";
import { User } from "../models/user";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const { id } = await req.json();
    const user = await User.findById(id);

    if (!user) return new Response("User not found", { status: 404 });
    return Response.json(user);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
