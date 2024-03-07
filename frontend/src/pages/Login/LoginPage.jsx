import AuthPageContainer from "../AuthPageContainer";
import UserLogin from "./UserLogin";

export default function LoginPage() {
  return (
    <AuthPageContainer title={"Login"}>
      <UserLogin />
    </AuthPageContainer>
  );
}
