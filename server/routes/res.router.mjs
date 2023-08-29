import express from "express";
const router = express.Router();

import {
  getAll,
  addRes,
  getOne,
  updateRes,
  deleteRes,
} from "../controller/res.controller.mjs";

router.route("/").get(getAll).post(addRes);
router.route("/:id").get(getOne).put(updateRes);
router.route("/:id").delete(deleteRes);
 
export default router;


