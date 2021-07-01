function verificar() {
  const name = localStorage.getItem("@NAME");
  const email = localStorage.getItem("@EMAIL");
  if (name === null && email === null) {
    location.href = "../login/index.html";
  }
}
verificar();
