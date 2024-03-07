import { Link } from "react-router-dom";
import useFetchLoggedInUser from "./header/useFetchLoggedInUser";

export default function ProfileCard() {
  const { data, error, loading } = useFetchLoggedInUser();
  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div></div>}
      {data && (
        <div className="fixed hidden w-1/3 bg-white border rounded xl:w-1/4 sm:block h-80">
          <div className="relative mx-auto overflow-hidden border rounded-sm h-1/3">
            <Link to={`/user/${data._id}`}>
              <img
                className="object-cover object-center w-full h-full "
                src={data.img_url}
                alt="Backgroundimage"
              />
              <img
                className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 border border-white rounded-full shadow-lg top-1/2 left-1/2"
                src={data.avatar_url}
                alt="Avatar"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center h-2/3">
            <h1 className="mt-8 text-2xl font-bold">{data.user_name}</h1>
            <p>Posts: {data.posts_id.length}</p>
            <p>Follower: {data.follower_id.length}</p>
            <Link to={`/user/${data._id}`}>
              <div className="p-2 mt-5 mb-5 text-xs text-center text-white rounded-sm md:text-base hover:cursor-pointer bg-info hover:bg-info/80">
                View Profile
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
