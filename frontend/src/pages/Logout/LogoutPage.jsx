import AuthPageContainer from "../AuthPageContainer";
import UserLogout from "./UserLogout";

export default function LogoutPage() {
  return (
    <AuthPageContainer title={"Logout"}>
      <UserLogout />
    </AuthPageContainer>
  );
}
