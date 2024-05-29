import Link from "next/link";

export default function App() {
  return (
    <div className="flex items-center justify-center h-screen gap-[5vw]">
      <Link href={"/login"}>
        <button className="btn btn-neutral">LogIn</button>
      </Link>
      <Link href={"/signup"}>
        <button className="btn btn-neutral">SignUp</button>
      </Link>
    </div>
  );
}
