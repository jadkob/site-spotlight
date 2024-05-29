import { isEmpty } from "../isEmpty";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password, email, discordLink } = await req.json();

    if (
      !username ||
      !password ||
      !email ||
      !discordLink ||
      isEmpty([username, password, email, discordLink])
    )
      return new Response("Missing fields", { status: 400 });

    const user = await User.findOne({ username });
    if (user) return new Response("User already exists", { status: 400 });

    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      discordLink,
    });
    await newUser.save();

    const token = await jwt.sign(
      { id: newUser.id, username, email, discordLink },
      "secret"
    );
    return Response.json(token);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
