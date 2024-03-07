import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-5 text-xl">The page doesn&apos;t exist</h1>
      <Link to={"/home"}>
        <p className="text-primary">Go back home</p>
      </Link>
    </div>
  );
}
