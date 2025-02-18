import NavBar from '@/widgets/navbar/NavBar';
import React from 'react';
import { Outlet } from 'react-router';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
