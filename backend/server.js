const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./services/db.service');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);

connectDB();

const positionRoutes = require('./api/position/position.routes');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const { requireAuth } = require('./middlewares/requireAuth.middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'cat mustache',
    resave: false,
    saveUninitialized: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));
}

const corsOptions = {
  origin: [
    'http://127.0.0.1:8081',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://localhost:8080',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/position', requireAuth, positionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
  // Handle SPA
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  // app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
