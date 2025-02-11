import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { fetchNote } from '../../entities/note/lib/noteThunk';
import NoteCardUi from '../../features/note/ui/NoteCardUi';

export default function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((store) => store.note.notes);


  useEffect(() => {
    void dispatch(fetchNote()).catch(() => {
      throw new Error();
    });
  }, [dispatch]);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <NoteCardUi note={note} />
        </div>
      ))}
    </div>
  );
}
