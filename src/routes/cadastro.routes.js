import { Router } from "express";
import { v4 as uuid } from "uuid";

import Repository from "../repository/Repository";

const cadastro = Router();

cadastro.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const currentContent = await Repository.findData();
    const resposta = { id: uuid(), name, email, password };
    currentContent.push(resposta);

    await Repository.saveData(currentContent);

    delete resposta.password;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro no envio!" });
  }
});

export default cadastro;
