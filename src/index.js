document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const mensagemInput = document.getElementById("mensagem");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function mostrarErro(input, mensagem) {
    const formGroup = input.parentElement;

    const erroExistente = formGroup.querySelector(".error-message");
    if (erroExistente) {
      erroExistente.remove();
    }

    input.classList.add("input-error");

    const erroElement = document.createElement("span");
    erroElement.className = "error-message";
    erroElement.textContent = mensagem;
    formGroup.appendChild(erroElement);
  }

  function removerErro(input) {
    const formGroup = input.parentElement;
    const erroExistente = formGroup.querySelector(".error-message");

    if (erroExistente) {
      erroExistente.remove();
    }

    input.classList.remove("input-error");
  }

  function mostrarSucesso() {
    const formGroup = form.querySelector(".form-group");
    const sucessoExistente = form.querySelector(".success-message");

    if (sucessoExistente) {
      sucessoExistente.remove();
    }

    const sucessoElement = document.createElement("div");
    sucessoElement.className = "success-message";
    sucessoElement.textContent = "✓ Mensagem enviada com sucesso!";
    form.insertBefore(sucessoElement, formGroup);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      sucessoElement.remove();
    }, 5000);
  }

  // Validação em tempo real
  nomeInput.addEventListener("input", function () {
    if (this.value.trim().length > 0) {
      removerErro(this);
    }
  });

  emailInput.addEventListener("input", function () {
    if (this.value.trim().length > 0) {
      removerErro(this);
    }
  });

  mensagemInput.addEventListener("input", function () {
    if (this.value.trim().length > 0) {
      removerErro(this);
    }
  });

  // Validação no envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formValido = true;

    if (nomeInput.value.trim() === "") {
      mostrarErro(nomeInput, "Por favor, preencha seu nome.");
      formValido = false;
    } else if (nomeInput.value.trim().length < 3) {
      mostrarErro(nomeInput, "O nome deve ter pelo menos 3 caracteres.");
      formValido = false;
    } else {
      removerErro(nomeInput);
    }

    if (emailInput.value.trim() === "") {
      mostrarErro(emailInput, "Por favor, preencha seu e-mail.");
      formValido = false;
    } else if (!validarEmail(emailInput.value.trim())) {
      mostrarErro(emailInput, "Por favor, insira um e-mail válido.");
      formValido = false;
    } else {
      removerErro(emailInput);
    }

    if (mensagemInput.value.trim() === "") {
      mostrarErro(mensagemInput, "Por favor, escreva uma mensagem.");
      formValido = false;
    } else if (mensagemInput.value.trim().length < 10) {
      mostrarErro(
        mensagemInput,
        "A mensagem deve ter pelo menos 10 caracteres."
      );
      formValido = false;
    } else {
      removerErro(mensagemInput);
    }

    if (formValido) {
      mostrarSucesso();
      form.reset();
    }
  });
});

