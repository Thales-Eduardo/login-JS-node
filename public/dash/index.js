function verificar() {
  const name = localStorage.getItem("@NAME");
  const email = localStorage.getItem("@EMAIL");
  const user = document.querySelector("#user");
  if (name === null && email === null) {
    location.href = "../login/index.html";
  }
  return (user.innerHTML += ` ${name} 👍✌`);
}
verificar();

function sair() {
  localStorage.removeItem("@NAME");
  localStorage.removeItem("@EMAIL");
  verificar();
}
