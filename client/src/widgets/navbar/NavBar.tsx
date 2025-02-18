import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Input, MenuMenu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useUser } from '@/entities/user/hooks/userHook';
import { useAppDispatch, useAppSelector } from '@/shared';
import type { RootState } from '@/app/store/store';
import { searchNotes } from '@/entities/note/redux/noteThunk';

export default function NavBar(): React.JSX.Element {
  const [activeItem, setActiveItem] = useState<string>('Главная');
  const [search, setSearch] = useState('');
  const { data } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { logoutHandler } = useUser();

  const searchHandler = async (searchNote: string): Promise<void> => {
    void dispatch(searchNotes(searchNote));
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      searchHandler(search).catch(console.error);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  const handleItemClick = (name: string): void => {
    setActiveItem(name);
  };

  const onSubmit = async (): Promise<void> => {
    await logoutHandler();
  };

  return (
    <div>
      <Menu pointing size='massive'>
        <MenuItem header>Добро пожаловать, {data ? data.name : 'Гость'}!</MenuItem>
        {data && (
          <>
            <MenuItem
              as={Link}
              to="/"
              name="Главная"
              active={activeItem === 'Главная'}
              onClick={() => handleItemClick('Главная')}
            />
            <MenuItem
              as={Link}
              to="/add"
              name="Добавить заметку"
              active={activeItem === 'Добавить заметку'}
              onClick={() => handleItemClick('Добавить заметку')}
            />
            <MenuMenu position="right">
              <MenuItem>
                <Input
                  icon="search"
                  name="search"
                  placeholder="Поиск..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </MenuItem>
              <MenuItem>
                <Button onClick={onSubmit}>Выход</Button>
              </MenuItem>
            </MenuMenu>
          </>
        )}
        {!data && (
          <>
            <MenuItem
              as={Link}
              to="/login"
              name="Вход"
              active={activeItem === 'Вход'}
              onClick={() => handleItemClick('Вход')}
            />
            <MenuItem
              as={Link}
              to="/register"
              name="Регистрация"
              active={activeItem === 'Регистрация'}
              onClick={() => handleItemClick('Регистрация')}
            />
          </>
        )}
      </Menu>
    </div>
  );
}
