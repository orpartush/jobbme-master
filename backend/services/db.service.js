const mongoose = require('mongoose');

module.exports = {
  connectDB,
};

const DB_URL = `mongodb+srv://orpt:admin@cluster0.fb6jr.mongodb.net/OUR_JOBS?retryWrites=true&w=majority`;

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database...');
});

async function connectDB() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.trace('Error while connecting mongoDB:', err);
  }
}
