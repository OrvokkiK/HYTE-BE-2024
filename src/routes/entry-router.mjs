import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const entryRouter = express.Router();

 entryRouter.route('/').get(authenticateToken, getEntries);
//TODO: add authentication and inputvalidation
entryRouter.route('/').post(authenticateToken, postEntry);

entryRouter.route('/:id').get(authenticateToken, getEntryById);

entryRouter.route('/:id').put(authenticateToken, putEntry);

entryRouter.route('/:id').delete(authenticateToken, deleteEntry);

// entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
