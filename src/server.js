import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

import Repository from "./repository/Repository";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/", async (req, res) => {
  const currentContent = await Repository.findData();
  delete currentContent.password;
  return res.send(currentContent);
});

app.post("/cadastro", async (req, res) => {
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

app.post("/log", async (req, res) => {
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

app.listen(3333, () => {
  console.log("No ar http://localhost:3333 🔥🔥🚒");
});
