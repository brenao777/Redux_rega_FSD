import type { RootState } from '../../../app/store/store';
import { fetchUser, loginHandler, logoutHandler, submitHandler } from '../redux/userThunks';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  return {
    user: { data, status },
    error,
    loginHandler: (loginData: FormData) => dispatch(loginHandler(loginData)),
    logoutHandler: () => dispatch(logoutHandler()),
    submitHandler: (registerData: FormData) => dispatch(submitHandler(registerData)),
  };
};
