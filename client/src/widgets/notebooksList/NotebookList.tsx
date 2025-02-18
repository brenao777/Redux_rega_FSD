import { getNotebooks } from '@/entities/notebook/redux/notebookThunk';
import { useAppDispatch, useAppSelector } from '@/shared';
import React, { useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import styles from './NotebookList.module.scss';
import NotebookCard from '@/entities/notebook/ui/NotebookCard';

export default function NotebookList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { error, loading, notebooks } = useAppSelector((store) => store.notebooks);

  useEffect(() => {
    void dispatch(getNotebooks());
  }, [dispatch]);

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
        {notebooks.map((notebook) => (
          <div key={notebook.id} className={styles.notes}>
            <NotebookCard notebook={notebook} />
          </div>
        ))}
      </div>
    </>
  );
}

React.memo(NotebookList)
