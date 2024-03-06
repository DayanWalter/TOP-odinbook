import React, { useState } from 'react';
import PostCreate from '../post/PostCreate';
import { Link } from 'react-router-dom';
import useFetchUser from '../../hooks/useFetchUser';
import useFetchLoggedInUser from '../../hooks/useFetchLoggedInUser';
import DropDownMenu from '../DropDownMenu';
import UserEdit from '../user/UserEdit';

import Icon from '@mdi/react';

import { mdiFilePlusOutline } from '@mdi/js';
import { mdiAccountMultiple } from '@mdi/js';
import { mdiHomeOutline } from '@mdi/js';

// import { useContext } from 'react';
// import { LanguageContext } from '../App';

export default function Header() {
  // const [language] = useContext(LanguageContext);

  const { data, error, loading } = useFetchLoggedInUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  // id from logged in user
  const authToken = localStorage.getItem('authToken');
  // Split the payload of the jwt and convert the ._id part
  const payload = JSON.parse(atob(authToken.split('.')[1]));
  // Define the username you are looking for
  const loggedInUserId = payload._id;
  const loggedInUserName = payload.user_name;

  const [showPostCreate, setShowPostCreate] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setShowPostCreate(false);
      setShowEditProfile(false);
    }
  };
  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div></div>}
      {data && (
        <header
          role="banner"
          className="fixed top-0 left-0 z-10 w-full h-16 shadow-md bg-blue-50 "
        >
          <div className="flex items-center w-full h-full px-5 sm:justify-between lg:px-16">
            <a href="/home" className="hidden text-2xl sm:block ">
              {' '}
              {'BITFEATHER'}{' '}
            </a>

            <nav
              id="mainmenu"
              role="navigation"
              className="w-full sm:w-3/4 lg:w-2/3"
            >
              <ul role="menubar" className="flex justify-between text-primary ">
                <Link to={'/home'}>
                  <li
                    role="menuitem"
                    className="flex items-center gap-3 hover:scale-105"
                  >
                    <Icon path={mdiHomeOutline} size={0.9} />
                    <p className="hidden sm:block">Home</p>
                  </li>
                </Link>

                <Link to={'/alluser'}>
                  <li role="menuitem" className="flex gap-3 hover:scale-105">
                    <Icon path={mdiAccountMultiple} size={0.9} />
                    <p className="hidden sm:block">All User</p>
                  </li>
                </Link>

                <li
                  role="menuitem"
                  onClick={() => {
                    setShowPostCreate(true);
                  }}
                  className="flex gap-3 hover:scale-105 hover:cursor-pointer"
                >
                  <Icon path={mdiFilePlusOutline} size={0.9} />
                  <p className="hidden sm:block">Post</p>
                </li>
                <li>
                  <img
                    className="absolute w-10 h-10 -translate-y-1/2 rounded-full shadow-lg hover:cursor-pointer right-5 top-1/2 "
                    src={data.avatar_url}
                    alt="Avatar"
                    onClick={() => setOpenDropdown((prev) => !prev)}
                  />
                  {openDropdown && (
                    <DropDownMenu
                      user={data}
                      setShowEditProfile={setShowEditProfile}
                    />
                  )}
                </li>
              </ul>
            </nav>
            {showEditProfile && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-gray-500/50"
                id="overlay"
                onClick={handleOverlayClick}
              >
                <UserEdit />
              </div>
            )}
            {showPostCreate && (
              <div
                id="overlay"
                onClick={handleOverlayClick}
                className="fixed inset-0 flex items-center justify-center bg-gray-500/50"
              >
                <div className="p-8 bg-white rounded-lg">
                  <PostCreate />
                </div>
              </div>
            )}
            <div></div>
          </div>
        </header>
      )}
    </>
  );
}
