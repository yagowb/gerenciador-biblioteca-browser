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
      console.log(`Livro ${titulo} foi removido com sucesso.`);
      return livroRemovido;
    } else {
      console.log("Livro não encontrado.");
      return null;
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
