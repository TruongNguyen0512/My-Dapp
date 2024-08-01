// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/MongoDbConfig');
const userRoute = require('./routes/UserRoute');
const errorHandler = require('./middleware/errorMiddleware');    

const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.json());  

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoute);
// Sử dụng middleware xử lý lỗi
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
