import { adicionarLivro, buscarLivro, removerLivro } from "./backend.js";
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

  formInserirLivro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const ano = parseInt(inputAno.value);

    if (titulo !== '' && autor !== '' && !isNaN(ano)) {
      const livro = new Livro(titulo, autor, ano);

      try {
        const response = await adicionarLivro(titulo, autor, ano);

        if (response) {
          biblioteca.inserirLivro(livro);
          inputTitulo.value = '';
          inputAutor.value = '';
          inputAno.value = '';
          textareaResultado.value = 'Livro inserido com sucesso!';
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
        const livro = await buscarLivro(titulo);

        if (livro) {
          textareaResultado.value = livro.toString();
        } else {
          textareaResultado.value = 'Livro não encontrado.';
        }
      } catch (error) {
        console.error(error);
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
        const livroRemovido = await removerLivro(titulo);

        if (livroRemovido) {
          biblioteca.removerLivro(titulo);
          textareaResultado.value = 'Livro removido com sucesso.';
          showAlertModal('Livro removido com sucesso.');
        } else {
          showAlertModal('Livro não está catalogado.');
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



  // Função para exibir o pop-up modal com a mensagem de erro
  function showAlertModal(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    const bootstrapModal = new bootstrap.Modal(alertModal);
    bootstrapModal.show();
  }
});
