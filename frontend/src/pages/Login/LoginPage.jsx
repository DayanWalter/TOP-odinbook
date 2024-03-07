// Components
import UserLogin from "./UserLogin";
import AuthPageContainer from "../AuthPageContainer";

export default function LoginPage() {
  return (
    <AuthPageContainer title={"Login"}>
      <UserLogin />
    </AuthPageContainer>
  );
}
