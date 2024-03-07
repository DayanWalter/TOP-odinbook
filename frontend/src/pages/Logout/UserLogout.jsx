import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function UserLogout() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);
  // Redirect user to login after x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((v) => v - 1);
    }, 1000);

    setTimeout(() => {
      localStorage.setItem('authToken', '');
      navigate('/login');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>Bye, see you soon!</div>

      <div>You will be redirected in {remainingTime} seconds...</div>
      <Link to={'/login'}> ...back to Login </Link>
    </>
  );
}
