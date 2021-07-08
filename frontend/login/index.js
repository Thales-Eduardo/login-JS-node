function formContato() {
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

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

  sendData({ email, password });
}

async function sendData(resposta) {
  await axios
    .post('http://localhost:3333/log', resposta)
    .then(res => {
      const { name, email, id } = res.data;
      localStorage.setItem('@NAME', name);
      localStorage.setItem('@EMAIL', email);
      localStorage.setItem('@ID', id);
      verificar();
    })
    .catch(error => {
      if (error) {
        alert('E-mail ou senha esta, incorreto.');
      }
    });
}

function verificar() {
  const name = localStorage.getItem('@NAME');
  const email = localStorage.getItem('@EMAIL');
  const id = localStorage.getItem('@ID');
  if (name === null && email === null && id === null) {
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
