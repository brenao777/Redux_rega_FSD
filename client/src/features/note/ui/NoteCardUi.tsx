import React, { useState } from 'react';
import { noteAddForm, type noteObjType } from '../../../entities/note/types/types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAppDispatch } from '../../../shared/hooks';
import { delNote, editNote } from '../../../entities/note/lib/noteThunk';

type Props = {
  note: noteObjType;
};

export default function NoteCardUi({ note }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const toggleShow = (): void => {
    setShow((prevShow) => !prevShow);
  };

  const deleteHandler = (id: number): void => {
    void dispatch(delNote(id));
  };

  const editHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const parsedNote = noteAddForm.parse({
        ...formData,
        notebookId: Number(formData.notebookId),
      });
      if (note.id) {
        await dispatch(editNote({ editedNote: parsedNote, id: note.id }));
      }
    } catch (error) {
      console.error('Ошибка --->', error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.body}</Card.Text>
        <Button
          style={{ background: 'darkred' }}
          onClick={() => deleteHandler(note.id)}
          variant="primary"
        >
          Удалить
        </Button>
        <br />
        <br />
        <Button style={{ background: 'darkblue' }} onClick={toggleShow} variant="primary">
          {show ? 'Скрыть' : 'Показать'}
        </Button>
        {show && (
          <div>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2vh',
                width: '35vh',
                marginTop: '20px',
              }}
              onSubmit={editHandler}
            >
              <input name="title" defaultValue={note.title} />
              <input name="body" defaultValue={note.body} />
              <input name="tags" defaultValue={note.tags} />
              <input name="notebookId" defaultValue={note.notebookId} />
              <button type="submit">Изменить</button>
            </form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
