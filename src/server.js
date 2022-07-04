/* eslint-disable linebreak-style */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const recipesRoutes = require('./routes/recipesRoutes');

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', usersRoutes);
app.use('/auth', authRoutes);
app.use('/', categoriesRoutes);
app.use('/', recipesRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
