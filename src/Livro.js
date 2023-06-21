export class Livro {
    constructor(titulo, autor, anoPublicacao) {
      this.titulo = titulo;
      this.autor = autor;
      this.anoPublicacao = anoPublicacao;
    }
  
    // Getters e setters
    getTitulo() {
      return this.titulo;
    }
  
    setTitulo(titulo) {
      this.titulo = titulo;
    }
  
    getAutor() {
      return this.autor;
    }
  
    setAutor(autor) {
      this.autor = autor;
    }
  
    getAnoPublicacao() {
      return this.anoPublicacao;
    }
  
    setAnoPublicacao(anoPublicacao) {
      this.anoPublicacao = anoPublicacao;
    }
  
    toString() {
      return `Livro { Título: ${this.titulo}, Autor: ${this.autor}, Ano de Publicação: ${this.anoPublicacao} }`;
    }
  }
  