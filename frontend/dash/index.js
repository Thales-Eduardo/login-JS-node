function verificar() {
  const name = localStorage.getItem('$NAME');
  const email = localStorage.getItem('$EMAIL');
  const id = localStorage.getItem('$ID');
  const avatar = localStorage.getItem('$AVATAR');

  const user = document.querySelector('#user');
  if (name === null && email === null && id === null && avatar === null) {
    location.href = '../login/index.html';
  }
  preview(name, email);
  return (user.innerHTML += ` ${name} 👍✌`);
}
verificar();

function sair() {
  localStorage.removeItem('$NAME');
  localStorage.removeItem('$EMAIL');
  localStorage.removeItem('$ID');
  localStorage.removeItem('$AVATAR');
  verificar();
}

function preview(name, email) {
  document.querySelector('#name').value = `${name}`;
  document.querySelector('#email').value = `${email}`;
}

function treatments() {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const oldPassword = document.querySelector('#old_password').value;
  const password = document.querySelector('#new_password').value;
  const password_confirmation = document.querySelector(
    '#password_confirmation'
  ).value;

  sendData({ name, email, oldPassword, password, password_confirmation });
}

async function sendData(resposta) {
  const id = localStorage.getItem('@ID');
  await axios
    .post(`http://localhost:3333/profile/${id}`, resposta)
    .then(() => {
      alert('update confirmado!');
    })
    .catch(error => {
      if (error) {
        alert('Erro no update.');
      }
    });
}
