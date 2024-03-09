// React
import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import Icon from "@mdi/react";
import { mdiFilePlusOutline } from "@mdi/js";
import { mdiAccountMultiple } from "@mdi/js";
import { mdiHomeOutline } from "@mdi/js";

// Components
import PostCreate from "./PostCreate";
import UserEdit from "./UserEdit";
import DropDownMenu from "./DropDownMenu";

// Hooks
import useFetchLoggedInUser from "./useFetchLoggedInUser";

export default function Header() {
  // Custom Hooks
  const { data, error, loading } = useFetchLoggedInUser();

  // Hooks
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPostCreate, setShowPostCreate] = useState(false);

  // Functions
  const handleOverlayClick = (event) => {
    if (event.target.id === "overlay") {
      setShowPostCreate(false);
      setShowEditProfile(false);
      setShowDropdown(false);
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
            {/* Logo */}
            <Link to="/home" className="hidden text-2xl sm:block ">
              {" "}
              {"BITFEATHER"}{" "}
            </Link>

            <nav
              id="mainmenu"
              role="navigation"
              className="w-full sm:w-3/4 lg:w-2/3"
            >
              <ul role="menubar" className="flex justify-between text-primary ">
                {/* Home link */}
                <Link to="/home">
                  <li
                    role="menuitem"
                    className="flex items-center gap-3 hover:scale-105"
                  >
                    <Icon path={mdiHomeOutline} size={0.9} />
                    <p className="hidden sm:block">Home</p>
                  </li>
                </Link>

                {/* All user link */}
                <Link to="/alluser">
                  <li role="menuitem" className="flex gap-3 hover:scale-105">
                    <Icon path={mdiAccountMultiple} size={0.9} />
                    <p className="hidden sm:block">All User</p>
                  </li>
                </Link>

                {/* Create post button */}
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

                {/* Dropdown menu button */}
                <li>
                  <img
                    className="absolute object-cover w-10 h-10 -translate-y-1/2 rounded-full shadow-lg hover:cursor-pointer right-5 top-1/2 "
                    src={data.avatar_url}
                    alt="Avatar"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  />
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
            {showDropdown && (
              <div
                id="overlay"
                onClick={handleOverlayClick}
                className="fixed inset-0 flex items-center justify-center bg-gray-500/50"
              >
                <DropDownMenu
                  user={data}
                  setShowEditProfile={setShowEditProfile}
                  setShowOpenDropdown={setShowDropdown}
                />
              </div>
            )}

            <div></div>
          </div>
        </header>
      )}
    </>
  );
}
