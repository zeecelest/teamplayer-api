//starts the server on the appropriate port
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
});