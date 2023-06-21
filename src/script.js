import { BibliotecaManager } from "./BibliotecaManager.js";
import { Livro } from "./Livro.js";


document.addEventListener('DOMContentLoaded', () => {
  const biblioteca = new BibliotecaManager();

  const formInserirLivro = document.getElementById('form-inserir-livro');
  const inputTitulo = document.getElementById('input-titulo');
  const inputAutor = document.getElementById('input-autor');
  const inputAno = document.getElementById('input-ano');
  const textareaResultado = document.getElementById('textarea-resultado');
  const inputBuscar = document.getElementById('input-buscar');
  const btnBuscar = document.getElementById('btn-buscar');
  const btnRemover = document.getElementById('btn-remover');
  const alertModal = document.getElementById('alert-modal');

  formInserirLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const ano = parseInt(inputAno.value);

    if (titulo !== '' && autor !== '' && !isNaN(ano)) {
      const livro = new Livro(titulo, autor, ano);

      if (biblioteca.buscarLivro(titulo) !== null) {
        showAlertModal('Livro já inserido');
      } else {
        biblioteca.inserirLivro(livro);
        inputTitulo.value = '';
        inputAutor.value = '';
        inputAno.value = '';
        textareaResultado.value = 'Livro inserido com sucesso!';
        showAlertModal('Livro inserido com sucesso!');
      }
    } else {
      showAlertModal('Preencha todos os campos corretamente');
    }
  });

  btnBuscar.addEventListener('click', () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      const livro = biblioteca.buscarLivro(titulo);

      if (livro !== null) {
        textareaResultado.value = livro.toString();
      } else {
        textareaResultado.value = 'Livro não encontrado.';
      }
    } else {
      showAlertModal('Digite o título do livro para realizar a busca.');
    }
  });

  btnRemover.addEventListener('click', () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      const livroRemovido = biblioteca.removerLivro(titulo);

      if (livroRemovido !== null) {
        textareaResultado.value = 'Livro removido com sucesso.';
        showAlertModal('Livro removido com sucesso.');
      } else {
        showAlertModal('Livro não está catalogado.');
      }
    } else {
      showAlertModal('Digite o título do livro para realizar a remoção.');
    }

    inputBuscar.value = '';
  });

  // Função para exibir o pop-up modal com a mensagem de erro
  function showAlertModal(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    const bootstrapModal = new bootstrap.Modal(alertModal);
    bootstrapModal.show();
  }
});
