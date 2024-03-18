import promisePool from "../utils/database.mjs";

const listAllTraining = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Exercises');
        console.log(`rows: ${rows}`);
        return rows
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const listAllTrainingByUSerId = async(id) => {
    try {
        const sql = 'SELECT * FROM Exercises WHERE user_id=?';
        const params = [id];
        const [rows] = await promisePool.query(sql, params);
        console.log(`rows: ${rows}`);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const findTrainingById = async (id, user_id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Exercises WHERE entry_id=? AND user_id =?'[id, user_id],
        );
        console.log(`rows: ${rows}`)
    }
}

const addTraining = async (entry) => {
    const {user_id, type, duration, intensity, date} = entry;
    const sql = 'INSERT INTO Exercises (user_id, type, duration, intensity, date) VALUES (?, ?, ?, ?, ?)';
    const params = [user_id, type, duration, intensity, date]
    try {
        const rows = await promisePool.query(sql, params);
        console.log(`rows: ${rows}`)
        return {exersice_id: rows[0].insertId};
    } catch (e) {
        console.log('error', e.message);
        return {error: e.message};
    }
};

const updateTrainingById = async (entry) => {
    const {exercise_id, type, duration, intensity, date} = entry;
    try {
        const sql = 'UPDATE Exercises SET date=?, type=?, duration=?, intensity=? WHERE exercise_id=?';
        const params = [date, type, duration, intensity, exercise_id]
        const [result] = await promisePool.query(sql, params);
        if (result.affectedRows === 0) {
            return {error:404, message: 'entry not found'};
    } return {message: 'entry updated', exercise_id};
    } catch (e) {
        console.e('updateTrainingbyId', error);
    return {error: 500, message: 'db error'};
    }
};

const deleteTrainingById = async (id) => {
    try {
        const sql = 'DELETE from Exercises WHERE exercise_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
        if (result.affectedRows === 0) {
            return {error: 404, message: 'entry not found'};
        }
    } catch (e) {
        console.log('deleteTrainingById', error);
        return {error: 500, message: 'db error'}

    }
};

export {listAllTraining,
    listAllTrainingByUSerId,
    findTrainingById,
    addTraining,
    updateTrainingById,
    deleteTrainingById};
