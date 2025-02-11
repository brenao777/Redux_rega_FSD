const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const { Notebook, Note } = require('../../db/models');
const { where } = require('sequelize');
const notebookRouter = express.Router();

notebookRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const notebooks = await Notebook.findAll({
        order: [['id', 'DESC']],
        include: {
          model: Note,
          attributes: ['id', 'title', 'body', 'tags', 'notebookId', 'userId'],
        },
      });
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const { title } = req.body;
      const userId = res.locals.user.id;
      if (!title) {
        res.status(500).json('Необходимо заполнить все поля!');
      }
      const newNotebook = await Notebook.create({ title, userId });
      res.status(201).json(newNotebook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  });

notebookRouter
  .route('/:notebookId')
  .delete(verifyAccessToken, async (req, res) => {
    try {
      const { notebookId } = req.params;
      const userId = res.locals.user.id;
      const oneNotebook = await Notebook.findByPk(notebookId);
      if (!oneNotebook || oneNotebook.userId !== userId) {
        return res.status(403).json('У вас нет прав для удаления блокнота!');
      }
      await Notebook.destroy({ where: { id: notebookId } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      const { title } = req.body;
      const { notebookId } = req.params;
      const oneNotebook = await Notebook.findByPk(notebookId);

      const updatedNotebook = await oneNotebook.update({
        title,
      });
      res.status(200).json(updatedNotebook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  });

module.exports = notebookRouter;
