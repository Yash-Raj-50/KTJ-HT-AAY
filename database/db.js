require('dotenv').config();
const db = require('mongoose');

db.set('strictQuery', true);

//connect to db
const connectDB = async () => {
  await db.connect(
    `mongodb+srv://aman_kumar:${process.env.DB_PASSWORD}@cluster0.be8wbb1.mongodb.net/findYourTeamDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('DB connected successfully');
};

connectDB().catch((err) => console.log(err));

module.exports = db;
