import { BibliotecaManager } from "./BibliotecaManager.js";
import { Livro } from "./Livro.js";

document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'http://localhost:3001';
  const biblioteca = new BibliotecaManager(baseURL);

  const formInserirLivro = document.getElementById('form-inserir-livro');
  const inputTitulo = document.getElementById('input-titulo');
  const inputAutor = document.getElementById('input-autor');
  const inputAno = document.getElementById('input-ano');
  const textareaResultado = document.getElementById('textarea-resultado');
  const inputBuscar = document.getElementById('input-buscar');
  const btnBuscar = document.getElementById('btn-buscar');
  const btnRemover = document.getElementById('btn-remover');
  const alertModal = document.getElementById('alert-modal');

  formInserirLivro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const ano = parseInt(inputAno.value);

    if (titulo !== '' && autor !== '' && !isNaN(ano)) {
      const livro = new Livro(titulo, autor, ano);

      try {
        const response = await biblioteca.inserirLivro(livro);

        if (response) {
          inputTitulo.value = '';
          inputAutor.value = '';
          inputAno.value = '';
          textareaResultado.textContent = 'Livro inserido com sucesso!';
          showAlertModal('Livro inserido com sucesso!');
        } else {
          showAlertModal('Erro ao inserir livro.');
        }
      } catch (error) {
        console.error(error);
        showAlertModal('Erro ao inserir livro.');
      }
    } else {
      showAlertModal('Preencha todos os campos corretamente');
    }
  });

  btnBuscar.addEventListener('click', async () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      try {
        const livro = await biblioteca.buscarLivro(titulo);

        if (!livro) {
          textareaResultado.textContent = 'Livro não encontrado.';
        } else {
          textareaResultado.textContent = `Título: ${livro.titulo}\nAutor: ${livro.autor}\nAno: ${livro.ano}`;
        }
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
        showAlertModal('Erro ao buscar livro.');
      }
    } else {
      showAlertModal('Digite o título do livro para realizar a busca.');
    }
  });

  btnRemover.addEventListener('click', async () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      try {
        const livroRemovido = await biblioteca.removerLivro(titulo);

        if (livroRemovido !== null) {
          textareaResultado.value = `Livro ${titulo} removido com sucesso.`;
          showAlertModal(`Livro ${titulo} removido com sucesso.`);

          //location.reload();
        } else {
          textareaResultado.value = 'Livro não encontrado.';
          showAlertModal('Livro não encontrado.');
        }
      } catch (error) {
        console.error(error);
        showAlertModal('Erro ao remover livro.');
      }
    } else {
      showAlertModal('Digite o título do livro para realizar a remoção.');
    }

    inputBuscar.value = '';
  });

  function showAlertModal(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.innerText = message;
    const bootstrapModal = new bootstrap.Modal(alertModal);
    bootstrapModal.show();
  }
});
