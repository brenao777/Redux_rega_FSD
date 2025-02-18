import NotesList from '@/widgets/notesList/NotesList';
import React from 'react';
import styles from './MainPage.module.scss';
import NotebookList from '@/widgets/notebooksList/NotebookList';
import EditModal from '@/widgets/editModal/ui/EditModal';

export default function MainPage(): React.JSX.Element {
  return (
    <div className={styles.containter}>
      <h1 className={styles.notebooksTitle}>Блокноты</h1>
      <NotebookList />
      <h1 className={styles.notesTitle}>Заметки</h1>
      <NotesList />
      <EditModal />
    </div>
  );
}
