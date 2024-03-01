const getAdminIds = (req, res, next) => {
    const sql = 'SELECT user_id FROM users where user_level = ?;'
    const params = ['admin']

};
