function formContato() {
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const resposta = { email, password };

  const regex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  if (!regex.test(email)) {
    alert("E-mail invalido, verificar credencias.");
    email.focus;
    return false;
  }

  sendData(resposta);
}

async function sendData(resposta) {
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
        alert("cheque suas crendencias.");
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
/*
name === null && email === null
  ? false
  : (location.href = "../dash/index.html");
*/
