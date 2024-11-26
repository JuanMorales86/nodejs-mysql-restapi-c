import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
} from "../controllers//employees.controller.js";
const router = Router(); //voy a crear un enrutado que va a venir de este Router()

//Enrutadores
router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployee); //:id es un parametro que se pasa en la url para obtener un empleado. viene de express
router.post("/employees", createEmployee);
router.patch("/employees/:id", updateEmployee);//si voy a actualizar todo el empleado es mejor usar put, pero si solo quiero actualizar un campo en especifico es mejor usar patch
router.delete("/employees/:id", deleteEmployee);

export default router;
