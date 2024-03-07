import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserLogout() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);
  // Redirect user to login after x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((v) => v - 1);
    }, 1000);

    setTimeout(() => {
      localStorage.setItem("authToken", "");
      navigate("/login");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-xl">Bye, see you soon!</h1>

      <h2>You will be redirected in {remainingTime} seconds...</h2>
      <Link to={"/login"}>
        <p className="text-primary hover:text-primary/80">...back to Login</p>
      </Link>
    </>
  );
}
