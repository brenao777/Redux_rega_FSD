import React from 'react';
import { useAppDispatch } from '../../shared/hooks';
import type { RegisterFormData } from '../../entities/user/types';
import { registerSchema } from '../../entities/user/types';
import { submitHandler } from '../../entities/user/lib/userThunks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './RegisterPage.module.scss';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData): void => {
    void dispatch(submitHandler(data));
    reset();
    void redirect('/');
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.input} type="text" {...register('name')} placeholder="Имя..." />
        {errors.name && <p className={styles.text}>{errors.name.message}</p>}

        <input
          className={styles.input}
          type="email"
          {...register('email')}
          placeholder="Email..."
        />
        {errors.email && <p className={styles.text}>{errors.email.message}</p>}

        <input
          className={styles.input}
          type="password"
          {...register('password')}
          placeholder="Пароль..."
        />
        {errors.password && <p className={styles.text}>{errors.password.message}</p>}

        <button className={styles.button}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
