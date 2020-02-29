// Connect express mongose body-parser
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

require('./models/films');
const app = express();

// connect database Films
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/Films`);

app.use(bodyParser.json());
require('./routes/filmRoutes')(app);

app.use(fileUpload());

app.post(`/api/upload`, async (req, res) => {
  const file = req.files.file;

  if (!file) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  let text = file.data.toString();

});

// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
