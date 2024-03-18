import express from 'express';
import {getTrainings,
    getTrainingByUserId,
    getTrainingById,
    postTraining,
    putTraining,
    deleteTraining} from '../controllers/training-controller.mjs'


const trainingRouter = express.Router();

//Routes
// http://127.0.0.1:3000/api/training

//add authToken
trainingRouter.route('/')
//List all excercise entries
.get()
//List all exercise

