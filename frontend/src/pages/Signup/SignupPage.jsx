import AuthPageContainer from "../AuthPageContainer";
import UserCreate from "./UserCreate";

export default function SignupPage() {
  return (
    <AuthPageContainer title={"Signup"}>
      <UserCreate />
    </AuthPageContainer>
  );
}
