'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Создание пользователей
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Mikhail',
        email: 'm@m.com',
        password: bcrypt.hashSync('qwertY1!', 10),
      },
      {
        name: 'Anna',
        email: 'a@a.com',
        password: bcrypt.hashSync('password1!', 10),
      },
      {
        name: 'Igor',
        email: 'i@i.com',
        password: bcrypt.hashSync('securePass2!', 10),
      },
    ]);

    // Создание блокнотов с новыми названиями
    await queryInterface.bulkInsert('Notebooks', [
      { title: 'Рабочий блокнот', userId: 1 },
      { title: 'Личный дневник', userId: 1 },
      { title: 'Учебный план', userId: 2 },
      { title: 'Путешествия', userId: 2 },
      { title: 'Спортивные достижения', userId: 3 },
      { title: 'Кулинарные рецепты', userId: 3 },
      { title: 'Список покупок', userId: 1 },
      { title: 'Идеи и вдохновение', userId: 2 },
      { title: 'Кино и сериалы', userId: 3 },
      { title: 'Хобби и увлечения', userId: 1 },
    ]);

    // Создание заметок с содержанием
    await queryInterface.bulkInsert('Notes', [
      // Заметки для рабочего блокнота
      {
        title: 'Заметка 1',
        body: 'Завершить отчет по проекту до пятницы.',
        notebookId: 1,
        tags: 'работа',
        userId: 1,
      },
      {
        title: 'Заметка 2',
        body: 'Подготовить презентацию для встречи.',
        notebookId: 1,
        tags: 'план',
        userId: 1,
      },
      {
        title: 'Заметка 3',
        body: 'Запланировать встречу с клиентом на следующую неделю.',
        notebookId: 1,
        tags: 'встречи',
        userId: 1,
      },
      {
        title: 'Заметка 4',
        body: 'Обсудить новую стратегию с командой.',
        notebookId: 1,
        tags: 'задачи',
        userId: 1,
      },
      {
        title: 'Заметка 5',
        body: 'Проверить отчеты по продажам за прошлый месяц.',
        notebookId: 1,
        tags: 'проект',
        userId: 1,
      },

      // Заметки для личного дневника
      {
        title: 'Заметка 1',
        body: 'Сегодня был хороший день, встретился с друзьями.',
        notebookId: 2,
        tags: 'личное',
        userId: 1,
      },
      {
        title: 'Заметка 2',
        body: 'Планирую поездку на выходные.',
        notebookId: 2,
        tags: 'семья',
        userId: 1,
      },
      {
        title: 'Заметка 3',
        body: 'Задумался о своих целях на следующий месяц.',
        notebookId: 2,
        tags: 'друзья',
        userId: 1,
      },
      {
        title: 'Заметка 4',
        body: 'Хочу попробовать новый рецепт на ужин.',
        notebookId: 2,
        tags: 'досуг',
        userId: 1,
      },
      {
        title: 'Заметка 5',
        body: 'Нужно больше времени уделять себе.',
        notebookId: 2,
        tags: 'планы',
        userId: 1,
      },

      // Заметки для учебного плана
      {
        title: 'Заметка 1',
        body: 'Подготовиться к экзамену по математике.',
        notebookId: 3,
        tags: 'учеба',
        userId: 2,
      },
      {
        title: 'Заметка 2',
        body: 'Прочитать главы 3 и 4 для следующей лекции.',
        notebookId: 3,
        tags: 'лекции',
        userId: 2,
      },
      {
        title: 'Заметка 3',
        body: 'Сделать домашнее задание по истории.',
        notebookId: 3,
        tags: 'задания',
        userId: 2,
      },
      {
        title: 'Заметка 4',
        body: 'Подготовить проект по биологии.',
        notebookId: 3,
        tags: 'экзамены',
        userId: 2,
      },
      {
        title: 'Заметка 5',
        body: 'Записаться на дополнительные курсы.',
        notebookId: 3,
        tags: 'проект',
        userId: 2,
      },

      // Заметки для блокнота путешествий
      {
        title: 'Заметка 1',
        body: 'Составить маршрут для поездки в Париж.',
        notebookId: 4,
        tags: 'путешествия',
        userId: 2,
      },
      {
        title: 'Заметка 2',
        body: 'Забронировать отель на три ночи.',
        notebookId: 4,
        tags: 'отпуск',
        userId: 2,
      },
      {
        title: 'Заметка 3',
        body: 'Собрать список достопримечательностей для посещения.',
        notebookId: 4,
        tags: 'маршруты',
        userId: 2,
      },
      {
        title: 'Заметка 4',
        body: 'Не забыть взять фотоаппарат!',
        notebookId: 4,
        tags: 'достопримечательности',
        userId: 2,
      },
      {
        title: 'Заметка 5',
        body: 'Посмотреть отзывы о ресторанах.',
        notebookId: 4,
        tags: 'рекомендации',
        userId: 2,
      },

      // Заметки для спортивных достижений
      {
        title: 'Заметка 1',
        body: 'Записать свои достижения в беге.',
        notebookId: 5,
        tags: 'спорт',
        userId: 3,
      },
      {
        title: 'Заметка 2',
        body: 'Составить план тренировок на месяц.',
        notebookId: 5,
        tags: 'тренировки',
        userId: 3,
      },
      {
        title: 'Заметка 3',
        body: 'Отслеживать прогресс в питании.',
        notebookId: 5,
        tags: 'питание',
        userId: 3,
      },
      {
        title: 'Заметка 4',
        body: 'Установить новые цели на ближайшие соревнования.',
        notebookId: 5,
        tags: 'цели',
        userId: 3,
      },
      {
        title: 'Заметка 5',
        body: 'Записать свои ощущения после тренировки.',
        notebookId: 5,
        tags: 'достижения',
        userId: 3,
      },

      // Заметки для кулинарных рецептов
      {
        title: 'Заметка 1',
        body: 'Попробовать новый рецепт пасты.',
        notebookId: 6,
        tags: 'хобби',
        userId: 3,
      },
      {
        title: 'Заметка 2',
        body: 'Записать любимые рецепты.',
        notebookId: 6,
        tags: 'ремесло',
        userId: 3,
      },
      {
        title: 'Заметка 3',
        body: 'Создать меню на неделю.',
        notebookId: 6,
        tags: 'творчество',
        userId: 3,
      },
      {
        title: 'Заметка 4',
        body: 'Изучить новые техники приготовления.',
        notebookId: 6,
        tags: 'идеи',
        userId: 3,
      },
      {
        title: 'Заметка 5',
        body: 'Собрать рецепты для вечеринки.',
        notebookId: 6,
        tags: 'проекты',
        userId: 3,
      },

      // Заметки для списка покупок
      {
        title: 'Заметка 1',
        body: 'Купить продукты для недели.',
        notebookId: 7,
        tags: 'покупки',
        userId: 1,
      },
      {
        title: 'Заметка 2',
        body: 'Не забыть про туалетную бумагу.',
        notebookId: 7,
        tags: 'список',
        userId: 1,
      },
      {
        title: 'Заметка 3',
        body: 'Купить подарок для друга.',
        notebookId: 7,
        tags: 'магазины',
        userId: 1,
      },
      {
        title: 'Заметка 4',
        body: 'Посмотреть акции в магазинах.',
        notebookId: 7,
        tags: 'скидки',
        userId: 1,
      },
      {
        title: 'Заметка 5',
        body: 'Составить список необходимых вещей для поездки.',
        notebookId: 7,
        tags: 'покупки',
        userId: 1,
      },

      // Заметки для идей и вдохновения
      {
        title: 'Заметка 1',
        body: 'Идея для нового проекта.',
        notebookId: 8,
        tags: 'кино',
        userId: 2,
      },
      {
        title: 'Заметка 2',
        body: 'Список книг для прочтения.',
        notebookId: 8,
        tags: 'рекомендации',
        userId: 2,
      },
      {
        title: 'Заметка 3',
        body: 'Записать мысли о будущем.',
        notebookId: 8,
        tags: 'обсуждение',
        userId: 2,
      },
      {
        title: 'Заметка 4',
        body: 'Идеи для блога.',
        notebookId: 8,
        tags: 'рецензии',
        userId: 2,
      },
      {
        title: 'Заметка 5',
        body: 'Создать план для нового хобби.',
        notebookId: 8,
        tags: 'список',
        userId: 2,
      },

      // Заметки для кулинарных рецептов
      {
        title: 'Заметка 1',
        body: 'Рецепт шоколадного торта.',
        notebookId: 9,
        tags: 'рецепты',
        userId: 3,
      },
      {
        title: 'Заметка 2',
        body: 'Рецепт салата Цезарь.',
        notebookId: 9,
        tags: 'кулинария',
        userId: 3,
      },
      {
        title: 'Заметка 3',
        body: 'Рецепт куриного филе с овощами.',
        notebookId: 9,
        tags: 'идеи',
        userId: 3,
      },
      {
        title: 'Заметка 4',
        body: 'Рецепт пиццы.',
        notebookId: 9,
        tags: 'блюда',
        userId: 3,
      },
      {
        title: 'Заметка 5',
        body: 'Рецепт домашнего мороженого.',
        notebookId: 9,
        tags: 'десерты',
        userId: 3,
      },

      // Заметки для хобби и увлечений
      {
        title: 'Заметка 1',
        body: 'Идея для нового проекта по рисованию.',
        notebookId: 10,
        tags: 'идеи',
        userId: 1,
      },
      {
        title: 'Заметка 2',
        body: 'План по созданию модели.',
        notebookId: 10,
        tags: 'планы',
        userId: 1,
      },
      {
        title: 'Заметка 3',
        body: 'Записать идеи для видео.',
        notebookId: 10,
        tags: 'проекты',
        userId: 1,
      },
      {
        title: 'Заметка 4',
        body: 'Изучить новую технику фотографии.',
        notebookId: 10,
        tags: 'размышления',
        userId: 1,
      },
      {
        title: 'Заметка 5',
        body: 'Составить список необходимых материалов.',
        notebookId: 10,
        tags: 'цели',
        userId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
    await queryInterface.bulkDelete('Notebooks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
