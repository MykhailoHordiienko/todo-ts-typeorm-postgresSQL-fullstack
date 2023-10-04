import app from './app';
import connectDB from './config/database';

const port = process.env.SERVER_PORT || 4200;

connectDB
  .initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Server started on port ${port}`));
    // eslint-disable-next-line no-console
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error during Data Source initialization:', err);
  });
