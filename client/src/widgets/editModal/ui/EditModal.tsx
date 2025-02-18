import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { editNote } from '../../../entities/note/redux/noteThunk';
import { useAppDispatch, useAppSelector } from '@/shared';
import { setSelected } from '../../../entities/note/redux/noteSlice';
import styles from './EditModal.module.scss';

export default function EditModal(): React.JSX.Element {
  const note = useAppSelector((store) => store.notes.selectedNote);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    void dispatch(setSelected(null));
  };

  const editHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (note) {
      const formData = new FormData(e.currentTarget);
      void dispatch(editNote({ id: note.id, formData }));
      handleClose()
    }
  };

  return (
    <Modal centered={true} className={styles.modal} open={!!note} onClose={handleClose}>
      <Modal.Header>Редактировать заметку</Modal.Header>
      <Modal.Content>
        <Form onSubmit={editHandler}>
          <Form.Field>
            <label>Название</label>
            <input type="text" name="title" defaultValue={note?.title} />
          </Form.Field>
          <Form.Field>
            <label>Заметка</label>
            <textarea name="body" defaultValue={note?.body} />
          </Form.Field>
          <Form.Field>
            <label>Тема</label>
            <input type="text" name="tags" defaultValue={note?.tags} />
          </Form.Field>
          <Form.Field>
            <label>Блокнот</label>
            <input type="text" name="notebookId" value={note?.notebookId} />
          </Form.Field>
          <Button type="submit">Сохранить</Button>
          <Button type="button" onClick={handleClose}>
            Отмена
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
