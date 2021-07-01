async function formContato() {
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const resposta = { email: email, password: password };

  await axios
    .post("http://localhost:3333/log", resposta)
    .then((res) => {
      const { name, email } = res.data;
      localStorage.setItem("@NAME", name);
      localStorage.setItem("@EMAIL", email);
      verificar();
    })
    .catch((error) => {
      if (error.response.data === false) {
        alert("cheque suas crendências.");
      }
    });
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
