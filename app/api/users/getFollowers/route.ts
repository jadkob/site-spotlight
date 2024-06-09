import { User } from "@/app/api/models/user";
import * as jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret")))
      return new Response("Unauthorized", { status: 401 });

    const { userId } = await req.json();

    const user = await User.findById(userId);

    return new Response(user?.followers as any);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
