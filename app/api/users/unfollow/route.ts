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
    const id = decoded._id;

    const { userId } = await req.json();
    const user1 = await User.findById(id);
    const user2 = await User.findById(userId);

    if (
      !user2?.followers.includes(decoded._id) ||
      !user1?.following.includes(user2?.id)
    )
      return new Response("Not Followed");
    await User.findByIdAndUpdate(id, {
      following: { $pull: userId },
    });
    await User.findByIdAndUpdate(userId, {
      followers: { $pull: id },
    });
    return new Response("User Unfollowed");
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
