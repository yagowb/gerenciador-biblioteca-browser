const express = require('express');
const cors = require('cors');
const { Deta } = require('deta');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const deta = Deta('e0ppigvzspa_mGgAPT2f9jLcEA7SynsWtXNmGaYQVXt1');
const db = deta.Base('gerenciadorBibliotecaJS');



//Rota de teste
app.get('/livros', async (req, res) => {
  try {
    const livros = await db.fetch();
    return res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar os livros:', error);
    return res.status(500).json({ error: 'Erro ao buscar os livros.' });
  }
});



// Rota para adicionar um livro
app.post('/livros', async (req, res) => {
  const { titulo, autor, ano } = req.body;

  if (!titulo || !autor || !ano) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    await db.put({ titulo, autor, ano });
    return res.status(201).json({ message: 'Livro inserido com sucesso.' });
  } catch (error) {
    console.error('Erro ao inserir o livro:', error);
    return res.status(500).json({ error: 'Erro ao inserir o livro.' });
  }
});


// Rota para buscar um livro
app.get('/livros/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  try {
    const livro = await db.fetch({ titulo });

    if (!livro || livro.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.json(livro);
  } catch (error) {
    console.error('Erro ao buscar o livro:', error);
    return res.status(500).json({ error: 'Erro ao buscar o livro.' });
  }
});



// Rota para remover um livro
app.delete('/livros/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  try {
    await db.delete(titulo);
    return res.json({ message: 'Livro removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover o livro:', error);
    return res.status(500).json({ error: 'Erro ao remover o livro.' });
  }
});



// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
