import React from 'react';
import AddPage from '@/pages/AddPage/AddPage';
import Layout from '@/pages/layout/Layout';
import LoginPage from '@/pages/LoginPage/LoginPage';
import MainPage from '@/pages/main/MainPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProrectedRouter';

export default function RouterProvider(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute allowedStatuses={['logged']} redirectTo="/login" />}>
            <Route index element={<MainPage />} />
            <Route path="/add" element={<AddPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedStatuses={['guest']} redirectTo="/login" />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
