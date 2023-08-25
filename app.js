const express = require('express');
const cors = require('cors');
const { Deta } = require('deta');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('src'));
app.use(cors());

const deta = Deta('e0ppigvzspa_mGgAPT2f9jLcEA7SynsWtXNmGaYQVXt1');
const db = deta.Base('gerenciadorBibliotecaJS');




app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '/src/index.html');
  res.sendFile(indexPath);
});




app.get('/livros', async (req, res) => {
  try {
    const livros = await db.fetch();
    return res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar os livros:', error);
    return res.status(500).json({ error: 'Erro ao buscar os livros.' });
  }
});




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



app.delete('/livros/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  try {
    const livroRemovido = await db.delete(titulo);

    if (livroRemovido) {
      return res.json({ message: 'Livro removido com sucesso.' });
    } else {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao remover o livro:', error);
    return res.status(500).json({ error: 'Erro ao remover o livro.' });
  }
});




app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
