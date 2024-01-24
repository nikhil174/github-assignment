import express from 'express';
import userRoutes from './routes/user.routes';
require('dotenv').config();
const cors = require('cors');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})