import UserCreate from "../../components/user/UserCreate";
import AuthPageContainer from "../AuthPageContainer";

export default function SignupPage() {
  return (
    <AuthPageContainer title={"Signup"}>
      <UserCreate />
    </AuthPageContainer>
  );
}
