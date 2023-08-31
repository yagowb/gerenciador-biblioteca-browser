const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://yagodev:YmRDCJlUsySsJWJX@cluster0.1wafvok.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db;

async function run() {
  try {
    await client.connect(); 
    db = client.db("gerenciadorBiblioteca"); 
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);


// Rota para index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, './src/index.html');
  res.sendFile(indexPath);
});



// Rota para adicionar um livro
app.post('/livros', async (req, res) => {
  const { titulo, autor, ano } = req.body;

  console.log('Dados recebidos no corpo da requisição:', titulo, autor, ano);

  if (!titulo || !autor || !ano) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const result = await db.collection('livros').insertOne({ titulo, autor, ano });
    console.log('Resultado da inserção no banco de dados:', result);

    if (result.insertedId) {
      return res.status(201).json({ message: 'Livro inserido com sucesso.' });
    } else {
      throw new Error('Erro ao inserir livro.');
    }
  } catch (error) {
    console.error('Erro ao inserir o livro:', error);
    return res.status(500).json({ error: 'Erro ao inserir o livro.' });
  }
});





// Rota para buscar um livro por título
app.get('/livros/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  console.log('Dado recebido no corpo da requisição:', titulo);

  try {
    const livro = await db.collection('livros').findOne({ titulo });
    console.log('Resultado da busca no banco de dados:', livro);

    if (!livro) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    return res.json(livro);
  } catch (error) {
    console.error('Erro ao buscar o livro:', error);
    return res.status(500).json({ error: 'Erro ao buscar o livro.' });
  }
});



// Rota para remover um livro por título
app.delete('/livros/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  console.log('Dado recebido no corpo da requisição:', titulo);

  try {
    const result = await db.collection('livros').deleteOne({ titulo });
    console.log('Resultado da remoção no banco de dados:', result);

    if (result.deletedCount === 1) {
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