//Controller for employees
import { pool } from "../db.js";
const cl = console.log.bind(console);

export const getEmployees = async (req, res) => {
  try {
    //throw new Error('Error inesperado')
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
    //nota : Con [rows] obtienes directamente el array de resultados. - Sin los corchetes obtienes un array que contiene [resultados, metadatos].
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
export const getEmployee = async (req, res) => {
  try {
    //cl(req.params.id)//req.params es un objeto que contiene los datos que enviamos en el body de la petición
    //throw new Error('Error inesperado')
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]); //nota : Con [rows] obtienes directamente el array de resultados. - Sin los corchetes obtienes un array que contiene [resultados, metadatos].

    rows.length > 0
      ? res.json(rows[0])
      : res.status(404).json({
          message: "Empleado no encontrado",
        }); //el rows[0] solo devuelve el el objeto empleado en lugar del array completo como si fuese a colocar rows solo
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    // encargado de errores generales
    //cl(req.body);//req.body es un objeto que contiene los datos que enviamos en el body de la petición
    if (typeof name !== "string" || typeof salary !== "number") {
      return res.status(400).json({
        message: "Los datos enviados no son válidos",
      });
    }

    try {
      // el try y catch captura cualquier error de la base de datos
      const [rows] = await pool.query(
        "INSERT INTO employee(name, salary) VALUES (? , ?)",
        [name, salary]
      );
      res.send({ id: rows.insertId, name, salary });
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el empleado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    result.affectedRows != 0
      ? res.sendStatus(204)
      : res.status(404).json({
          message: "Empleado no encontrado",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    ); // IFNULL(?, name) es un condicional de sql que dice que si name es null, entonces se reemplaza por el valor de name, si no, se deja como está.

    if (result.affectedRows === 0) {
      return res.sendStatus(404).json({
        message: "Empleado no encontrado",
      });
    }

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
