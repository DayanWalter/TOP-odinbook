import { Link } from 'react-router-dom';

export default function IndexSite() {
  return (
    <div>
      <h1>User:</h1>
      <ul>
        <li>
          <Link to={`user/create`}>CreateUser</Link>
        </li>
        <li>
          <Link to={`user/login`}>LoginUser</Link>
        </li>
        <li>
          <Link to={`users`}>ReadUsers(protected)</Link>
        </li>
        <li>
          <Link to={`user/delete`}>DeleteUser(protected)</Link>
        </li>
        <li>
          <Link to={`user/update`}>UpdateUser(protected)</Link>
        </li>
      </ul>
      <h1>Post:</h1>
      <ul>
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
