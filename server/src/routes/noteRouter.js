const express = require('express');
const { Note } = require('../../db/models');
const noteRouter = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const { Op } = require('sequelize');

noteRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const { search } = req.query;
      if (search && search.length !== 0) {
        const notes = await Note.findAll({
          where: {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
        res.json(notes);
      } else {
        const result = await Note.findAll();
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { title, body, tags, notebookId } = req.body;
      if (!title || !body || !tags || !notebookId) {
        return res.status(400).json({
          message: 'Заполните все обязательные поля!',
        });
      }

      const newNote = await Note.create({
        title,
        body,
        tags,
        notebookId: Number(notebookId),
        userId,
      });

      return res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  .put(async (req, res) => {
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
      note.notebookId = Number(notebookId);
      await note.save();
      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
      console.log(error);
    }
  })
  .delete(async (req, res) => {
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
