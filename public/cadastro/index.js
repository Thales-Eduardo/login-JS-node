async function formCadastro() {
  const name = document.querySelector('.name').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

  const resposta = { name, email, password };

  const regex =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  if (!regex.test(email)) {
    alert('E-mail invalido, verificar credencias.');
    email.focus;
    return false;
  }

  EnviarCadastro(resposta);
}

async function EnviarCadastro(resposta) {
  await axios
    .post('http://localhost:3333/cadastro', resposta)
    .then(res => {
      if (res) {
        location.href = '../login/index.html';
      }
    })
    .catch(error => {
      if (error) {
        alert('Esse email já existe!');
      }
    });
}

function verificar() {
  const name = localStorage.getItem('@NAME');
  const email = localStorage.getItem('@EMAIL');
  if (name === null && email === null) {
    return;
  } else {
    location.href = '../dash/index.html';
  }
}
verificar();

/*
name === null && email === null
  ? false
  : (location.href = "../dash/index.html");
*/
