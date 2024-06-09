import * as jwt from "jsonwebtoken";
import { User } from "../../models/user";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token || !(await jwt.verify(token, "secret"))) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: any = await jwt.decode(token);
    const id = decoded.id;

    const { userId } = await req.json();
    const user1 = await User.findById(id);
    const user2 = await User.findById(userId);

    if (
      user2?.followers.includes(decoded.id) ||
      user1?.following.includes(user2?.id)
    ) {
      return new Response("Already Followed", { status: 400 });
    }

    await User.findByIdAndUpdate(id, {
      $push: { following: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { followers: id },
    });

    const newUser = await User.findById(userId).lean(); // Using lean() for a plain JavaScript object
    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
