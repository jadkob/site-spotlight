import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isEmpty } from "../isEmpty";
import { User } from "../models/user";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password])) {
      return new Response("Missing required fields", { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) return new Response("Incorrect username", { status: 400 });

    if (!(await bcrypt.compare(password, user.password as string))) {
      return new Response("Incorrect password", { status: 400 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username,
        email: user.email,
        discordLink: user.discordLink,
      },
      "secret"
    );
    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
