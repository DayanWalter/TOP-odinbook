import { Link } from 'react-router-dom';

export default function IndexSite() {
  return (
    <div>
      <h1>User:</h1>
      <ul>
        <h2>SignUpSite.jsx:</h2>
        <li>
          <Link to={`signup`}>Signup</Link>
        </li>
        <li>
          <Link to={`user/create`}>CreateUser</Link>
        </li>
        <h2>LoginSite.jsx:</h2>
        <li>
          <Link to={`login`}>Login</Link>
        </li>
        <li>
          <Link to={`user/login`}>LoginUser</Link>
        </li>
        <h2>MainSite.jsx:</h2>
        <h3>ProfileSite.jsx:</h3>
        <p>Everyone:</p>
        <li>
          <Link to={`users`}>ReadUsers(protected)</Link>
        </li>
        <p>Logged in User:</p>
        <li>
          <Link to={`user/delete`}>DeleteUser(protected)</Link>
        </li>
        <li>
          <Link to={`user/update`}>UpdateUser(protected)</Link>
        </li>
      </ul>
      <h1>Post:</h1>
      <ul>
        <p>Logged in User:</p>
        <li>
          <Link to={'post/create'}>CreatePost(protected)</Link>
        </li>
        <li>
          <Link to={'post/feed'}>ReadFeedPosts(protected)</Link>
        </li>
      </ul>
      <h1>Comment:</h1>
    </div>
  );
}
