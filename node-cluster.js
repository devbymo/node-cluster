const cluster = require('cluster');

// Master Mode - Fork Workers
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode
  cluster.fork(); // Thread 1
  cluster.fork(); // Thread 2
  cluster.fork(); // Thread 3
  cluster.fork(); // Thread 4
} else {
  // Child Mode - Act like a server
  const express = require('express');
  const app = express();

  const intensiveWork = (duration) => {
    const start = Date.now();
    duration = duration * 1000; // In seconds
    while (Date.now() - start < duration) {}
  };

  app.get('/lazy', (req, res) => {
    intensiveWork(10);
    res.send('Takes 10 sec to response!');
  });

  app.get('/fast', (req, res) => {
    res.send('Fast response!');
  });

  app.listen(3000, () => {
    console.log('server is up on port 3000!');
  });
}
