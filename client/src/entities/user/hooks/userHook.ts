import type { RootState } from '../../../app/store/store';
import { useEffect } from 'react';
import { fetchUser, loginHandler, logoutHandler, submitHandler } from '../lib/userThunks';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import type { LoginCredentials, RegisterFormData, UseUserReturnType } from '../types';

export const useUser = (): UseUserReturnType => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  return {
    user: { data, status, error },
    error,
    loginHandler: (loginData: LoginCredentials) => dispatch(loginHandler(loginData)),
    logoutHandler: () => dispatch(logoutHandler()),
    submitHandler: (registerData: RegisterFormData) => dispatch(submitHandler(registerData)),
  };
};
