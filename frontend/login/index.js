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
      const { user, token } = res.data;
      localStorage.setItem('$NAME', user.name);
      localStorage.setItem('$EMAIL', user.email);
      localStorage.setItem('$ID', user.id);
      localStorage.setItem('$AVATAR', user.avatar);
      localStorage.setItem('$TOKEN', token);
      verificar();
    })
    .catch(error => {
      if (error.response) {
        const { message } = error.response.data;
        alert(message);
      }
    });
}

function verificar() {
  const token = localStorage.getItem('$TOKEN');
  token === null ? false : (location.href = '../dash/index.html');
}
verificar();
