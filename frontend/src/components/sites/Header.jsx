import React from 'react';

// import { useContext } from 'react';
// import { LanguageContext } from '../App';

export default function Header() {
  // const [language] = useContext(LanguageContext);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 z-10 w-full h-16 shadow-md backdrop-blur-sm bg-neutral-100/40 dark:bg-neutral-900/70"
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
          <ul
            role="menubar"
            className="flex justify-between text-primary dark:text-white"
          >
            <li role="none" className="hover:scale-105">
              <a href="/main" role="menuitem">
                Home
              </a>
            </li>
            <li role="none" className="hover:scale-105">
              <a href="/friends" role="menuitem">
                Friends
              </a>
            </li>
            <li role="none" className="hover:scale-105">
              <a href="#" role="menuitem">
                Post
              </a>
            </li>
          </ul>
        </nav>
        <div></div>
      </div>
    </header>
  );
}
