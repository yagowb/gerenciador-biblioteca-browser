import { ArvoreBPlus } from './ArvoreBPlus.js';


export class BibliotecaManager {
  constructor() {
    this.arvore = new ArvoreBPlus(10);
  }
  

  inserirLivro(livro) {
    const titulo = livro.getTitulo();
    if (this.buscarLivro(titulo) !== null) {
      console.log("Livro já inserido");
      return;
    }
    this.arvore.inserir(livro);
  }


  async removerLivro(titulo) {
    try {
      const response = await fetch(`http://localhost:3001/livros/${titulo}`, {
        method: 'DELETE'
      });

      if (response.status === 200) {
        const livroRemovidoArvore = this.arvore.remover(titulo);

        if (livroRemovidoArvore !== null) {
          console.log(`Livro ${titulo} foi removido com sucesso da árvore.`);
          return livroRemovidoArvore;
        } else {
          console.log(`Livro ${titulo} foi removido do backend, mas não encontrado na árvore.`);
          return null;
        }
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
  

  buscarLivro(titulo) {
    const livroEncontrado = this.arvore.buscar(titulo);
    if (livroEncontrado !== null) {
      return livroEncontrado;
    } else {
      return null; // Retorna null quando o livro não é encontrado
    }
  }
}
