import {
    listAllEntries,
    findEntryById,
    addEntry,
    deleteEntryById,
    updateEntryById,
    listAllEntriesByUserId,
  } from '../models/entry-model.mjs';

import { authenticateToken } from '../middlewares/authentication.mjs';

  const getEntries = async (req, res) => {
    const result = await listAllEntriesByUserId(req.user.user_id);
    console.log(result);

    if (!result.error) {
      res.json(result);
    }  else {
      res.status(500);
      res.json(result);
    }
  };

  // original
/*  const getEntryById = async (req, res) => {
    const entry = await findEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
      res.sendStatus(404);
    }
  }; */

  const getEntryById = async (req, res) => {
    const entry = await findEntryById(req. params.id, req.user.user_id);
    if (entry) {
      res.json(entry);
    } else {
      res.sendStatus(404);
    }
  };


  const postEntry = async (req, res) => {
    const user_id = await req.user.user_id;

    //missä reitti?


    const {entry_date, mood, weight, sleep_hours, notes} = req.body;
    if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
      const result = await addEntry(req.body, user_id);
      if (result.entry_id) {
        res.status(201);
        res.json({message: 'New entry added.', ...result});
      } else {
        res.status(500);
        res.json(result);
      }
    } else {
      res.sendStatus(400);
    }
  };

  const putEntry = async (req, res) => {
    const user_id = req.user.user_id; //undefined?
    const entry_id = req.params.id;
    const {entry_date, mood, weight, sleep_hours, notes} = req.body;
    // check that all needed fields are included in request
    if ((entry_date || weight || mood || sleep_hours || notes) && entry_id) {
      const result = await updateEntryById({entry_id, ...req.body, user_id});
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.status(201).json(result);
    } else {
      return res.status(400).json({error: 400, message: 'bad request'});
    }
  };

  const deleteEntry = async (req, res) => {
    const result = await deleteEntryById(req.params.id, req.user.user_id);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  };

  export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
