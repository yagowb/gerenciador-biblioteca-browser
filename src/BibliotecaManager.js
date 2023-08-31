export class BibliotecaManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl; 
  }

  async inserirLivro(livro) {
    try {
      const response = await fetch(`${this.baseUrl}/livros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorMessage = await response.text(); // Captura a mensagem de erro
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao adicionar livro');
    }
  }
  

  async removerLivro(titulo) {
    try {
      const response = await fetch(`${this.baseUrl}/livros/${titulo}`, {
        method: 'DELETE'
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        console.log(`Livro ${titulo} não encontrado no backend.`);
        return null;
      } else {
        throw new Error('Erro ao remover livro');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao remover livro.');
    }
  }

  async buscarLivro(titulo) {
    try {
      const response = await fetch(`${this.baseUrl}/livros/${encodeURIComponent(titulo)}`);

      if (response.status === 404) {
        console.log(`Livro ${titulo} não encontrado no backend.`);
        return null;
      }

      if (!response.ok) {
        throw new Error(`Erro ao buscar livro (${response.status} ${response.statusText})`);
      }

      const livro = await response.json();

      if (livro) {
        const livroFormatado = {
          titulo: livro.titulo || 'Sem título',
          autor: livro.autor || 'Autor desconhecido',
          ano: livro.ano || 'Ano desconhecido'
        };
        return livroFormatado;
      } else {
        console.log(`Livro ${titulo} não encontrado no backend.`);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw new Error('Erro ao buscar livro.');
    }
  }
}
