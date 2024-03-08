import { Link } from "react-router-dom";

export default function ContributeCard() {
  return (
    <>
      <div className="fixed hidden w-1/3 h-64 bg-white border rounded xl:w-1/4 xl:block">
        <div className="flex flex-col items-center justify-center w-full gap-5 mt-6">
          <img src="./bitfeather.png" alt="bitfeather logo" />
          <h2 className="text-3xl font-semibold text-primary">BitFeather</h2>
          <p className="text-xs">The place where you can chirp out loud...</p>

          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`https://github.com/DayanWalter/TOP-odinbook`}
          >
            <p className="underline underline-offset-2 text-primary hover:text-primary/80">
              View Code
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
