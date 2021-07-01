function formContato() {
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;

  const resposta = {
    name: name,
    email: email,
    password: password,
  };

  axios
    .post("http://localhost:3333/contato", resposta)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function verificar() {
  const name = localStorage.getItem("@NAME");
  const email = localStorage.getItem("@EMAIL");
  if (name === null && email === null) {
    return;
  } else {
    location.href = "../dash/index.html";
  }
}
verificar();
