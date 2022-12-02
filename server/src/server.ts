import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (err: any) => {
  process.exit(1);
});

// Dependencies
import http from 'http';
import app from './app';

const { PORT = 3001 } = process.env;

// true if file is executed. Is used for test to work
if (require.main === module) {
  const server = http.createServer(app).listen(PORT, () => {
    console.log('server started at ' + PORT);
  });

  process.on('unhandledRejection', (err: any) => {
    server.close(() => {
      process.exit(1);
    });
  });
}

export default app;
