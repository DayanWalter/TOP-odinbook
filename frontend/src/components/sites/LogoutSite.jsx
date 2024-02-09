import styles from './Site.module.css';
import { Link, useNavigate } from 'react-router-dom';
import UserLogout from '../user/UserLogout';
import { useEffect, useState } from 'react';

export default function LogoutSite() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(5);
  // Redirect user to login after x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((v) => v - 1);
    }, 1000);

    setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loginSite}>
      <UserLogout />
      <div>You will be redirected in {remainingTime} seconds...</div>
      <Link to={'/login'}> ...back to Login </Link>
    </div>
  );
}
