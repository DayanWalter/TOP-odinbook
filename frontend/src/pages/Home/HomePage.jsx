// Components
import PostFeed from "./PostFeed";
import MainPageContainer from "../MainPageContainer";
import ContributeCard from "../../components/ContributeCard";
import ProfileCard from "../../components/ProfileCard";

export default function HomePage() {
  return (
    <MainPageContainer>
      <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full ">
          <ProfileCard />
        </div>

        <PostFeed />

        <div className="flex justify-end w-full ">
          <ContributeCard />
        </div>
      </div>
    </MainPageContainer>
  );
}
