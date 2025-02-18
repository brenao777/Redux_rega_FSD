import { addNote } from '@/entities/note/redux/noteThunk';
import { useAppDispatch } from '@/shared';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styles from './AddUI.module.scss';

export default function AddUI(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log(Object.fromEntries(formData));
      void dispatch(addNote(formData));
      void redirect('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Создать заметку</h1>
        <Form.Control type="text" placeholder="Название" name="title" />
        <Form.Control type="text" placeholder="Ваша заметка" name="body" />
        <Form.Control type="number" placeholder="Блокнот" name="notebookId" />
        <Form.Control type="text" placeholder="Тема" name="tags" />
        <Button className={styles.button} type="submit">
          Создать
        </Button>
      </Form>
    </div>
  );
}
