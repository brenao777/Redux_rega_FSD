import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../widgets/Navbar/NavBar';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
