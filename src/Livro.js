export class Livro {
    constructor(titulo, autor, ano) {
      this.titulo = titulo;
      this.autor = autor;
      this.ano = ano;
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
  
    getAno() {
      return this.ano;
    }
  
    setAno(ano) {
      this.ano = ano;
    }
  
    toString() {
      return `Livro { Título: ${this.titulo}, Autor: ${this.autor}, Ano de Publicação: ${this.ano} }`;
    }
  }
  