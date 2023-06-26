const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://yagodev:m5BGDYPisj4H1Mw4@cluster0.1wafvok.mongodb.net/gerenciadorBiblioteca';



async function run() {
  const client = new MongoClient(uri, {

  });

  try {
    await client.connect();
    console.log('Conexão bem-sucedida ao banco de dados.');
    


    // Rota para adicionar um livro
    app.post('/livros', async (req, res) => {
      const { titulo, autor, ano } = req.body;
    
      if (!titulo || !autor || !ano) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }
    
      const collection = client.db('gerenciadorBiblioteca').collection('Livros');
      const livro = { titulo, autor, ano };
    
      try {
        await collection.insertOne(livro);
        return res.status(201).json({ message: 'Livro inserido com sucesso.' });
      } catch (error) {
        console.error('Erro ao inserir o livro:', error);
        return res.status(500).json({ error: 'Erro ao inserir o livro.' });
      }
    });
    


    // Rota para buscar um livro
    app.get('/livros/:titulo', async (req, res) => {
      const titulo = req.params.titulo;
    
      const collection = client.db('gerenciadorBiblioteca').collection('Livros');
    
      try {
        const livro = await collection.findOne({ titulo });
        if (!livro) {
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
    
      const collection = client.db('gerenciadorBiblioteca').collection('Livros');
    
      try {
        const result = await collection.deleteOne({ titulo });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Livro não encontrado.' });
        }
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
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    client.close();
  }
}

run().catch(console.error);
