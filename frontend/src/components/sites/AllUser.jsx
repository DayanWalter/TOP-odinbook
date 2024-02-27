import React from 'react';
import Header from './Header';
import UsersRead from '../user/UsersRead';
import MainSite from './MainSite';

export default function AllUser() {
  return (
    <>
      <MainSite>
        <UsersRead />
      </MainSite>
    </>
  );
}
