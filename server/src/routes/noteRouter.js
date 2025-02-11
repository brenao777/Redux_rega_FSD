const express = require('express');
const { Note } = require('../../db/models');
const noteRouter = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyTokens');

noteRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const notes = await Note.findAll({ order: [['id', 'DESC']] });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { title, body, tags, notebookId } = req.body;
      if (!title || !body || !tags || !notebookId) {
        return res.status(400).json({
          message:
            'Пожалуйста, заполните все обязательные поля (title, body, notebookId, tags).',
        });
      }

      const newNote = await Note.create({
        title,
        body,
        tags,
        notebookId,
        userId,
      });

      return res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера при создании заметки' });
      console.error(error);
    }
  });

noteRouter
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ message: 'Заметка не найдена' });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, body, tags, notebookId } = req.body;
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ message: 'Заметка не найдена' });
      }
      await note.update({ title, body, tags, notebookId });
      note.title = title;
      note.body = body;
      note.tags = tags;
      note.notebookId = notebookId;
      await note.save();
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  })
  .delete(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(404).json({ message: 'Заметка не найдена' });
      }
      await note.destroy();
      res.json({ message: 'Заметка успешно удалена' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  });
module.exports = noteRouter;
