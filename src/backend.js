

// Função para adicionar um livro no backend
export async function adicionarLivro(titulo, autor, ano) {
    try {
      const response = await fetch('/livros', {
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
    }
  }


  
  // Função para buscar um livro no backend
  export async function buscarLivro(titulo) {
    try {
      const response = await fetch(`/livros/${titulo}`);
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao buscar livro');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  
  // Função para remover um livro do backend
  export async function removerLivro(titulo) {
    try {
      const response = await fetch(`/livros/${titulo}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Erro ao remover livro');
      }
    } catch (error) {
      console.error(error);
    }
  }
  