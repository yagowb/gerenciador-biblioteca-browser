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
      const livro = await this.buscarLivro(titulo);
        
      if (livro !== null) {
        const chaveUrlEncoded = encodeURIComponent(livro.key);
        const response = await fetch(`http://localhost:3001/livros/${chaveUrlEncoded}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error(`Erro ao remover livro (${response.status} ${response.statusText})`);
        }
        
        const livroRemovidoArvore = this.arvore.remover(livro.key);
  
        if (livroRemovidoArvore !== null) {
          console.log(`Livro ${titulo} foi removido com sucesso da árvore.`);
          return livroRemovidoArvore;
        } else {
          console.log(`Livro ${titulo} foi encontrado no backend, mas não na árvore.`);
          return null;
        }
      } else {
        console.log(`Livro ${titulo} não encontrado no backend.`);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar/remover livro:', error);
      throw new Error('Erro ao buscar/remover livro.');
    }
  }
  
  

  buscarLivro(titulo) {
    const livroEncontrado = this.arvore.buscar(titulo);
    if (livroEncontrado !== null) {
      return livroEncontrado;
    } else {
      return null; 
    }
  }
}
