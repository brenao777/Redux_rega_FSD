import React from 'react';
import { CardMeta, CardHeader, CardDescription, CardContent, Card } from 'semantic-ui-react';
import type { NoteType } from '../model/types/types';
import styles from './NoteCard.module.scss';
import { useAppDispatch } from '@/shared';
// import { deleteNote } from '../redux/noteThunk';
import { setSelected } from '../redux/noteSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import noteService from '../api/noteService';

type Props = {
  note: NoteType;
};

function NoteCard({ note }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  // const deleteHandler = (id: number): void => {
  //   void dispatch(deleteNote(id));
  // };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => noteService.deleteNote(id),
    mutationKey: ['delNote'],
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      const previousNotes = queryClient.getQueryData<NoteType[]>(['notes']) ?? [];

      queryClient.setQueryData<NoteType[]>(
        ['notes'],
        (notes) => notes?.filter((n) => n.id !== id) ?? [],
      );

      return { previousNotes };
    },
    onError: (err, id, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
    },
    onSuccess: () => {
     void queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <Card className={styles.note}>
      <CardContent>
        <CardHeader>{note.title}</CardHeader>
        <CardMeta>{note.tags}</CardMeta>
        <CardDescription>{note.body}</CardDescription>
        <button onClick={() => mutation.mutate(note.id)} className={styles.deleteBtn}>
          ❌
        </button>
        <button onClick={() => dispatch(setSelected(note))} className={styles.editBtn}>
          ✏️
        </button>
      </CardContent>
    </Card>
  );
}

export default React.memo(NoteCard);
