function verificar() {
  const name = localStorage.getItem('$NAME');
  const email = localStorage.getItem('$EMAIL');
  const avatar = localStorage.getItem('$AVATAR');
  if (name === null && email === null && avatar === null) {
    location.href = '../login/index.html';
  }
  preview(name, email, avatar);
}
verificar();

function sair() {
  localStorage.removeItem('$NAME');
  localStorage.removeItem('$EMAIL');
  localStorage.removeItem('$ID');
  localStorage.removeItem('$AVATAR');
  localStorage.removeItem('$TOKEN');
  verificar();
}

function preview(name, email, avatar) {
  document.querySelector('#name').value = `${name}`;
  document.querySelector('#email').value = `${email}`;
  document.querySelector('#user').innerHTML += ` ${name} ✌`;
  const img = document.querySelector('img');
  img.alt = `${name}`;
  if (avatar === 'default') {
    return (img.src = `https://image.flaticon.com/icons/png/512/747/747968.png`);
  }
  img.src = `http://localhost:3333/files/${avatar}`;
}

function treatments() {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const oldPassword = document.querySelector('#old_password').value;
  const password = document.querySelector('#new_password').value;
  const password_confirmation = document.querySelector(
    '#password_confirmation'
  ).value;

  const regexName = /^.{3,}$/gm;
  if (!regexName.test(name)) {
    alert('Por favor, preencha o campo nome, no mínimo 3 caracteres.');
    return false;
  }

  const regexEmail =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  if (!regexEmail.test(email)) {
    alert('E-mail invalido, verificar credencias.');
    return false;
  }

  if (oldPassword > 0) {
    const regexOldPassword = /^(?=.*?[0-9]).{6,}$/;
    if (!regexOldPassword.test(oldPassword)) {
      alert('Por favor, preencha o campo password, no mínimo 6 caracteres.');
      return false;
    }

    const regexNewPassword = /^(?=.*?[0-9]).{6,}$/;
    if (!regexNewPassword.test(password)) {
      alert('Por favor, preencha o campo password, no mínimo 6 caracteres.');
      return false;
    }

    const regexPassword_confirmation = /^(?=.*?[0-9]).{6,}$/;
    if (!regexPassword_confirmation.test(password_confirmation)) {
      alert('Por favor, preencha o campo password, no mínimo 6 caracteres.');
      return false;
    }

    if (password !== password_confirmation) {
      alert('Erro na confirmação de senha.');
    }
  }
  sendData({ name, email, oldPassword, password, password_confirmation });
}

async function sendData(resposta) {
  const token = localStorage.getItem('$TOKEN');
  axios.defaults.headers.authorization = `Bearer ${token}`;
  await axios
    .put(`http://localhost:3333/profile`, resposta)
    .then(res => {
      alert('update confirmado!');
      const { name, email, id } = res.data;
      saveUpdateData({ name, email, id });
      verificar();
    })
    .catch(error => {
      if (error.response) {
        const { message } = error.response.data;
        alert(message);
        sair();
      }
    });
}

function saveUpdateData({ name, email, id, avatar }) {
  localStorage.setItem('$NAME', name);
  localStorage.setItem('$EMAIL', email);
  localStorage.setItem('$ID', id);
  if (avatar) {
    localStorage.setItem('$AVATAR', avatar);
  }
}

function image(e) {
  if (e.target.files) {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    sendAvatar(data);
  }
}

async function sendAvatar(avatar) {
  const token = localStorage.getItem('$TOKEN');
  axios.defaults.headers.authorization = `Bearer ${token}`;
  await axios
    .patch(`http://localhost:3333/avatar`, avatar)
    .then(res => {
      const { name, email, id, avatar } = res.data;
      saveUpdateData({ name, email, id, avatar });
    })
    .catch(error => {
      if (error.response) {
        const { message } = error.response.data;
        alert(message);
        sair();
      }
    });
}
