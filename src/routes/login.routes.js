import { Router } from "express";

import Repository from "../repository/Repository";

const login = Router();

login.post("/log", async (req, res) => {
  try {
    const { password, email } = req.body;

    const currentContent = await Repository.findData();

    const verificar = currentContent.find(
      (data) => data.email === email && data.password === password
    );

    if (!verificar) {
      return res.status(400).json(false);
    }

    delete verificar.password;

    return res.status(200).json(verificar);
  } catch (error) {
    console.log(error);
  }
});

export default login;
