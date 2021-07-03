import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const cadastro = [];

app.post("/contato", (req, res) => {
  try {
    const { name, email, password } = req.body;
    const resposta = { name, email, password };

    cadastro.push(resposta);

    console.table([resposta]);

    return res.status(200).json(resposta);
  } catch (error) {
    return res.status(400).json({ error: "Erro no envio!" });
  }
});

app.post("/log", (req, res) => {
  const { password, email } = req.body;

  const verificar = cadastro.find(
    (data) => data.email === email && data.password === password
  );

  if (!verificar) {
    return res.status(400).json(false);
  }

  delete verificar.password;

  return res.status(200).json(verificar);
});

app.listen(3333, () => {
  console.log("No ar http://localhost:3333 🔥🔥🚒");
});
