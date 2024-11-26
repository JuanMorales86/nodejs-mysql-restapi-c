//controller for index db
import { pool } from "../db.js";

export const ping = async (req,res) => {
    const result =  await pool.query('SELECT id FROM employee');
        res.json(result)
}