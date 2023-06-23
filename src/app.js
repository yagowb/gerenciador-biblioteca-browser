const express = require('express');
const mysql = require('mysql');


// Configuração do servidor
const app = express();
const port = 3001;


// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados',
});


// Conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados.');
});


// Middleware para processar requisições com corpo em formato JSON
app.use(express.json());


// Rota para adicionar um livro
app.post('/livros', (req, res) => {
  const { titulo, autor, ano } = req.body;

  if (!titulo || !autor || !ano) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const query = 'INSERT INTO livros (titulo, autor, ano) VALUES (?, ?, ?)';
  connection.query(query, [titulo, autor, ano], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error.stack);
      return res.status(500).json({ error: 'Erro ao inserir o livro.' });
    }

    return res.status(201).json({ message: 'Livro inserido com sucesso.' });
  });
});



// Rota para buscar um livro
app.get('/livros/:titulo', (req, res) => {
  const titulo = req.params.titulo;

  const query = 'SELECT * FROM livros WHERE titulo = ?';
  connection.query(query, [titulo], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error.stack);
      return res.status(500).json({ error: 'Erro ao buscar o livro.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.json(results[0]);
  });
});



// Rota para remover um livro
app.delete('/livros/:titulo', (req, res) => {
  const titulo = req.params.titulo;

  const query = 'DELETE FROM livros WHERE titulo = ?';
  connection.query(query, [titulo], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error.stack);
      return res.status(500).json({ error: 'Erro ao remover o livro.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.json({ message: 'Livro removido com sucesso.' });
  });
});



// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
