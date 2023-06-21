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
  
    removerLivro(titulo) {
      const livroRemovido = this.arvore.remover(titulo);
      if (livroRemovido !== null) {
        return livroRemovido;
      } else {
        console.log("Livro não encontrado.");
        return null;
      }
    }
  
    buscarLivro(titulo) {
      return this.arvore.buscar(titulo);
    }
  }
  