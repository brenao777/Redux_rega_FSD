import React from 'react';
import NoteCard from '@/entities/note/ui/NoteCard';
import { useAppSelector } from '@/shared';
import { Dimmer, Loader } from 'semantic-ui-react';
import styles from './NotesList.module.scss';
import { useQuery } from '@tanstack/react-query';
import noteService from '@/entities/note/api/noteService';

export default function NotesList(): React.JSX.Element {
  const error = useAppSelector((store) => store.notes.error);
  const loading = useAppSelector((store) => store.notes.loading);
  // const notes = useAppSelector((store) => store.notes.notes);

  const notebookId = useAppSelector((store) => store.notebooks.notebookId);

  const { data: fetchedNotes } = useQuery({
    queryKey: ['notes'],
    queryFn: () => noteService.getNotes(),
    staleTime: 1000 * 5 * 60,
  });
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   void dispatch(fetchedNotes());
  // }, [dispatch]);

  const filtredNotes = fetchedNotes?.filter((note) => note.notebookId === notebookId) ?? [];

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="huge" inverted>
          Загрузка
        </Loader>
      </Dimmer>
    );
  }
  return (
    <>
      {error && <p>{error}</p>}
      <div className={styles.containter}>
        {filtredNotes.map((note) => (
          <div key={note.id} className={styles.notes}>
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </>
  );
}
