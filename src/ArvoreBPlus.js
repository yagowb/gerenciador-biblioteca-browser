import { Livro } from './Livro.js';

export class ArvoreBPlus {
  constructor(ordem) {
    this.ordem = ordem;
    this.raiz = new NoFolha(ordem);
  }
  

  inserir(livro) {
    if (livro !== null) {
      this.raiz.inserir(livro);
    }
  }

  remover(titulo) {
    if (titulo !== '') {
      return this.raiz.remover(titulo);
    }
    return null;
  }
  
  buscar(titulo) {
    if (titulo !== '') {
      return this.raiz.buscar(titulo);
    }
    return null;
  }
}

class No {
  constructor() {
    this.chaves = [];
  }

  inserir(livro) {
    throw new Error('Método "inserir" deve ser implementado nas classes filhas');
  }

  remover(titulo) {
    throw new Error('Método "remover" deve ser implementado nas classes filhas');
  }

  buscar(titulo) {
    throw new Error('Método "buscar" deve ser implementado nas classes filhas');
  }
}

class NoFolha extends No {
  constructor(ordem) {
    super();
    this.livros = [];
    this.chaves = [];
    this.proximo = null;
    this.ordem = ordem;
  }
  

  inserir(livro) {
    let index = 0;
    while (index < this.livros.length && livro.getTitulo().localeCompare(this.livros[index].getTitulo()) >= 0) {
      index++;
    }
    this.livros.splice(index, 0, livro);
    this.chaves.splice(index, 0, livro.getTitulo());

    if (this.livros.length > this.ordem) {
      this.dividir();
    }
  }

  dividir() {
    const meio = Math.floor(this.livros.length / 2);
    const livrosDireita = this.livros.splice(meio);
    const chavesDireita = this.chaves.splice(meio);

    const novaFolha = new NoFolha();
    novaFolha.livros = livrosDireita;
    novaFolha.chaves = chavesDireita;
    novaFolha.proximo = this.proximo;

    this.proximo = novaFolha;
  }

  remover(titulo) {
    const index = this.chaves.indexOf(titulo);
    if (index !== -1) {
      this.chaves.splice(index, 1);
      return this.livros.splice(index, 1)[0];
    } else {
      return null;
    }
  }

  buscar(titulo) {
    for (let i = 0; i < this.chaves.length; i++) {
      if (this.livros[i].getTitulo().toLowerCase().includes(titulo.toLowerCase())) {
        return this.livros[i];
      }
      
    }
    return null;
  }
}

class NoInterno extends No {
  constructor() {
    super();
    this.filhos = [];
  }

  inserir(livro) {
    let index = 0;
    while (index < this.chaves.length && livro.getTitulo().localeCompare(this.chaves[index]) > 0) {
      index++;
    }
    this.filhos[index].inserir(livro);
  }

  remover(titulo) {
    let index = 0;
    while (index < this.chaves.length && titulo.localeCompare(this.chaves[index]) > 0) {
      index++;
    }
    const livroRemovido = this.filhos[index].remover(titulo);
    if (livroRemovido !== null) {
      this.chaves.splice(index, 1);
    }
    return livroRemovido;
  }

  buscar(titulo) {
    let index = 0;
    while (index < this.chaves.length && titulo.localeCompare(this.chaves[index]) >= 0) {
      index++;
    }
    return this.filhos[index].buscar(titulo);
  }
}