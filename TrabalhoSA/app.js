let usuarios = [];

document.getElementById('cadastroForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const usuarioExistente = usuarios.find(user => user.email === email);
  if (usuarioExistente) {
    alert('Email já está registrado!');
  } else {
    usuarios.push({ nome, email, senha });
    alert('Cadastro realizado com sucesso! Por favor, faça o login.');

    mostrarLogin();
  }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  
  const emailLogin = document.getElementById('emailLogin').value;
  const senhaLogin = document.getElementById('senhaLogin').value;

  const usuario = usuarios.find(user => user.email === emailLogin && user.senha === senhaLogin);
  if (usuario) {
    alert(`Bem-vindo(a), ${usuario.nome}!`);
    window.location.href = 'home.html';
  } else {
    alert('Email ou senha incorretos.');
  }
});

document.getElementById('irParaLogin').addEventListener('click', mostrarLogin);
document.getElementById('irParaCadastro').addEventListener('click', mostrarCadastro);

function mostrarLogin() {
  document.getElementById('cadastro').classList.remove('active');
  document.getElementById('login').classList.add('active');
}

function mostrarCadastro() {
  document.getElementById('login').classList.remove('active');
  document.getElementById('cadastro').classList.add('active');
}
