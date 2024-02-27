import PostFeed from '../post/PostFeed';
import MainSite from './MainSite';

export default function Home() {
  const token = localStorage.getItem('authToken');
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Define the username you are looking for
  const userId = payload._id;
  const userName = payload.user_name;
  return (
    <MainSite>
      <PostFeed />
    </MainSite>
  );
}
