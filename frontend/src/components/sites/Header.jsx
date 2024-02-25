import React, { useState } from 'react';
import PostCreate from '../post/PostCreate';

// import { useContext } from 'react';
// import { LanguageContext } from '../App';

export default function Header() {
  // const [language] = useContext(LanguageContext);
  const [showPostCreate, setShowPostCreate] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target.id === 'overlay') {
      setShowPostCreate(false);
    }
  };
  return (
    <header
      role="banner"
      className="fixed top-0 left-0 z-10 w-full h-16 shadow-md bg-neutral-50 "
    >
      <div className="flex items-center w-full h-full px-5 sm:justify-between lg:px-16">
        <a href="#home" className="hidden text-2xl sm:block ">
          {' '}
          {'BITFEATHER'}{' '}
        </a>

        <nav
          id="mainmenu"
          role="navigation"
          className="w-full sm:w-3/4 lg:w-2/3"
        >
          <ul role="menubar" className="flex justify-between text-primary ">
            <li role="none" className="hover:scale-105">
              <a href="/home" role="menuitem">
                Home
              </a>
            </li>
            <li role="none" className="hover:scale-105">
              <a href="/friends" role="menuitem">
                Friends
              </a>
            </li>
            <li role="none" className="hover:scale-105">
              <a
                href="#"
                onClick={() => {
                  showPostCreate
                    ? setShowPostCreate(false)
                    : setShowPostCreate(true);
                }}
                role="menuitem"
              >
                Post
              </a>
            </li>
            <li>
              <a href="">Profile</a>
            </li>
          </ul>
        </nav>
        {showPostCreate && (
          <div
            id="overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
          >
            <div className="p-8 bg-white rounded-lg">
              <PostCreate />
            </div>
          </div>
        )}
        <div></div>
      </div>
    </header>
  );
}
