import React from 'react';
import { useAppDispatch } from '../../shared/hooks';
import { noteAddForm } from '../../entities/note/types/types';
import { addNote } from '../../entities/note/lib/noteThunk';
import styles from './AddNotePage.module.scss';
import { useNavigate } from 'react-router-dom';

export default function AddNotePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const parsedData = noteAddForm.parse({
        ...formData,
        notebookId: Number(formData.notebookId),
      });
      await dispatch(addNote(parsedData));
      await redirect('/')
    } catch (error) {
      console.error('ОШИБКА ПРИ ДОБАВЛЕНИИ : ', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={submitHandler}>
        <input type="text" name="title" placeholder="Название" />
        <input type="text" name="body" placeholder="Заметка" />
        <input type="text" name="tags" placeholder="Тэги" />
        <input type="number" name="notebookId" placeholder="Блокнот" />
        <button type="submit">Добавить заметку</button>
      </form>
    </div>
  );
}
