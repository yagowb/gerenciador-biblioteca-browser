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

  // Função para inserir um livro no backend
  async function adicionarLivro(titulo, autor, ano) {
    try {
      const response = await fetch('http://localhost:3001/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor, ano })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao adicionar livro');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao adicionar livro');
    }
  }

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

  // Função para buscar um livro no backend
  async function buscarLivro(titulo) {
    try {
      const response = await fetch(`http://localhost:3001/livros/${titulo}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar livro (${response.status} ${response.statusText})`);
      }

      const data = await response.json();
      console.log('Dados da resposta:', data);

      if (data && Array.isArray(data) && data.length > 0) {
        const livro = data[0];
        const livroFormatado = {
          titulo: livro.titulo || 'Sem título',
          autor: livro.autor || 'Autor desconhecido',
          ano: livro.ano || 'Ano desconhecido'
        };
        return livroFormatado;
      } else {
        throw new Error('Livro não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw new Error('Erro ao buscar livro.');
    }
  }

  btnBuscar.addEventListener('click', async () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      try {
        const livro = await buscarLivro(titulo);

        if (!livro || Object.keys(livro).length === 0) {
          textareaResultado.value = 'Livro não encontrado.';
        } else {
          textareaResultado.value = `Título: ${livro.titulo}\nAutor: ${livro.autor}\nAno: ${livro.ano}`;
        }
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
        showAlertModal('Erro ao buscar livro.');
      }
    } else {
      showAlertModal('Digite o título do livro para realizar a busca.');
    }
  });

  // Função para remover um livro do backend
  async function removerLivro(titulo) {
    try {
      const response = await fetch(`http://localhost:3001/livros/${titulo}`, {
        method: 'DELETE'
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        return false; // Retorna false quando o livro não é encontrado
      } else {
        throw new Error('Erro ao remover livro');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao remover livro.');
    }
  }

  btnRemover.addEventListener('click', async () => {
    const titulo = inputBuscar.value.trim();

    if (titulo !== '') {
      try {
        const livroRemovido = await removerLivro(titulo);

        if (livroRemovido !== false) {
          if (livroRemovido) {
            biblioteca.removerLivro(titulo);
            textareaResultado.value = `Livro ${titulo} removido com sucesso.`;
            showAlertModal(`Livro ${titulo} removido com sucesso.`);
          }
        } else {
          textareaResultado.value = 'Livro não encontrado.'; // Exibe a mensagem na textarea
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

  // Função para exibir o pop-up modal com a mensagem de erro
  function showAlertModal(message) {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    const bootstrapModal = new bootstrap.Modal(alertModal);
    bootstrapModal.show();
  }
});
