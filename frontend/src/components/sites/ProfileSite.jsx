import React from 'react';
import MainSite from './MainSite';
import UserProfile from '../user/UserProfile';

export default function ProfileSite() {
  return (
    <MainSite>
      {/* UserData from here? */}
      <UserProfile />
    </MainSite>
  );
}
