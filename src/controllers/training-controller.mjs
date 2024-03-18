import bcrypt from 'bcryptjs';

import {listAllTraining,
    listAllTrainingByUSerId,
    findTrainingById,
    addTraining,
    updateTrainingById,
    deleteTrainingById} from '../models/training-model.mjs'

// Gets all exercise data from db
const getTrainings = async (req, res) =>  {
    const result = await listAllTraining();
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.json(result);
};
//Gets all of the exercise data base on user_id
const getTrainingByUserId = async (req, res) => {
    const result = await listAllTrainingByUSerId(req.params.id);
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.json(result);
}

//Gets Training by exercise id (requiers token)
const getTrainingById = async(req, res) => {
    const user_id = req.user_id;
    const exercise_id = req.params.id;
    const result = await findTrainingById(exercise_id, user_id);
    if (result) {
        res.json(result)
    } else {
        res.sendStatus(404);
    }
};

//Adding New Entry to table Exercises
const postTraining = async (req, res) => {
    const {type, duration, intensity, date} = req.body;
    const user_id = req.user.user_id;
    if (type && duration && intensity && date) {
        const result = await addTraining(user_id, type, duration, intensity, date);
        if (result.exercise_id) {
            res.status(201);
            res.json({message: 'New entry added to exercises', ...result});
        } else {
            res.status(500);
            res.json(result);
        }
    } else {
        res.sendStatus(400);
    }
};

// Editing existing entry
const putTraining =  async (req, res) => {
    const entry_id = req.params.id;
    const user_id = req.user.user_id
    const {date, type, duration, intensity} = req.body
    if ((date || type || duration || intensity) && entry_id) {
        const result = await updateTrainingById(entry_id, ...req.body);
        if (result.error) {
            return res.status(result.error).json(result);
        }
        return res.status(201).json(result);
    } else {
        return res.status(400).json({error: 400, message: 'bad request'});
    }
};

//Deleting entry
const deleteTraining = async (req, res) => {
    const result = await deleteTrainingById(req.params.id);
    if (result.error) {
        return res.status(result.error).json(result);
    }
    return res.status(400).json({error: 400, message: 'bad request'});
}

export {
    getTrainings,
    getTrainingByUserId,
    getTrainingById,
    postTraining,
    putTraining,
    deleteTraining
}
