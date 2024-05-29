import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="navbar flex justify-center gap-[5vw]">
      <Link className="btn btn-ghost" href={"/home"}>
        Home
      </Link>
      <Link className="btn btn-ghost" href={"/add"}>
        Add
      </Link>
      <Link className="btn btn-ghost" href={"/profile"}>
        Profile
      </Link>
      <button
        className="btn btn-ghost"
        onClick={() => {
          deleteCookie("token");
          router.push("/");
        }}
      >
        LogOut
      </button>
    </nav>
  );
}
