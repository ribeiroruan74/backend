import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import productRoutes from './routes/produto.routes';
import corsMiddleware from './config/corsConfig';

dotenv.config();

const app = express();
app.use(corsMiddleware);
app.use(express.json());

// Conexão com o Banco de Dados
connectDB();

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/estoque/produtos', productRoutes);

app.get('/', (req, res) => {
  res.send('API de Estoque funcionando!');
});

const PORT = process.env.PORT || 4000; // Fallback para porta 4000 se PORT não estiver definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});