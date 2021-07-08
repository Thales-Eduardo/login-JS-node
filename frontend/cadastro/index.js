async function formCadastro() {
  const name = document.querySelector('.name').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

  const regexName = /^.{3,}$/gm;
  if (!regexName.test(name)) {
    alert('Por favor, preencha o campo nome, no mínimo 3 caracteres.');
    email.focus;
    return false;
  }

  const regexPassword = /^(?=.*?[0-9]).{6,}$/;
  if (!regexPassword.test(password)) {
    alert('Por favor, preencha o campo password, no mínimo 6 caracteres.');
    email.focus;
    return false;
  }

  const regexEmail =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if (!regexEmail.test(email)) {
    alert('E-mail invalido, verificar credencias.');
    email.focus;
    return false;
  }

  EnviarCadastro({ name, email, password });
}

async function EnviarCadastro(resposta) {
  const button = document.querySelector('button');
  button.innerHTML = 'Carregando....';
  await axios
    .post('http://localhost:3333/cadastro', resposta)
    .then(res => {
      if (res) {
        location.href = '../login/index.html';
      }
    })
    .catch(error => {
      if (error) {
        alert('Esse email já existe! ' + error);
        button.innerHTML = 'Enviar';
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
