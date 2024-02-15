const Game = require('../models/games');

const addGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    const existingGame = await Game.findOne({ username: req.body.username });
    if (existingGame) {
      return res.status(400).json('Ese juego ya está registrado');
    }
    const savedGame = await newGame.save();
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newGame = new Game(req.body);
    newGame._id = id;
    const updatedGame = await Game.findByIdAndUpdate(id, newGame, {
      new: true
    });
    return res.status(200).json({
      message: 'Juego actualizado correctamente',
      juego: updatedGame
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGame = await Game.findByIdAndDelete(id);
    if (deletedGame) {
      return res
        .status(200)
        .json({ mensaje: 'Juego eliminado', juego: deletedGame });
    } else {
      return res.status(404).json('Juego no encontrado');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getGames = async (req, res, next) => {
  try {
    const allGames = await Game.find();
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { addGame, editGame, deleteGame, getGames };
