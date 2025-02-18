import React from 'react';
import { Card, CardContent, CardHeader } from 'semantic-ui-react';
import styles from './NotebookCard.module.scss';
import type { NotebookType } from '../model/types/types';
import { useAppDispatch } from '@/shared';
import { switchId } from '../redux/notebookSlice';

type Props = {
  notebook: NotebookType;
};

function NotebookCard({ notebook }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  const switchHandler = (id: number): void => {
    void dispatch(switchId(id));
  };

  return (
    <Card className={styles.notebook} onClick={() => switchHandler(notebook.id)}>
      <CardContent>
        <CardHeader>{notebook.title}</CardHeader>
        {/* <button className={styles.deleteBtn}>❌</button>
        <button className={styles.editBtn}>✏️</button> */}
      </CardContent>
    </Card>
  );
}

export default React.memo(NotebookCard);
