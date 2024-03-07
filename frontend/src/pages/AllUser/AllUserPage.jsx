import ContributeCard from "../../components/ContributeCard";
import ProfileCard from "../../components/ProfileCard";
import MainPageContainer from "../MainPageContainer";
import UsersRead from "./UsersRead";

export default function AllUserPage() {
  return (
    <MainPageContainer>
      <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="w-full ">
          <ProfileCard />
        </div>

        <UsersRead />

        <div className="flex justify-end w-full ">
          <ContributeCard />
        </div>
      </div>
    </MainPageContainer>
  );
}
