// Components
import UserLogout from "./UserLogout";
import AuthPageContainer from "../AuthPageContainer";

export default function LogoutPage() {
  return (
    <AuthPageContainer title={"Logout"}>
      <UserLogout />
    </AuthPageContainer>
  );
}
