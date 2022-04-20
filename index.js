const express = require('express');
const cors = require('cors');
const appRouter = require('./src/routes');
const {
  boomErrorHandler, errorHandler, logError, sequelizeErrorsHandler,
} = require('./src/middlewares/error.handler');

const app = express();
const PORT = process.env.PORT ?? 3100;

app.use(express.json());
app.use(cors());

appRouter(app);

app.use(logError);
app.use(sequelizeErrorsHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
