const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const router = express.Router();

router.get('/:fileName', (req, res) => {
  try {
      // Extract the image filename from the request URL
      const fileName = req.params.fileName;

      // Construct the file path
      const filePath = path.join(__dirname, 'public', 'images', fileName);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
          // Read the file and send it as the response
          res.sendFile(filePath);
      } else {
          // If the file doesn't exist, return a 404 error
          res.status(404).send("File not found");
      }
  } catch (err) {
      console.error("Error serving image:", err);
      res.status(500).send("Error serving image");
  }
});

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://blossom-belle-cosmetics-frontend.vercel.app',
  ],
  credentials: true
}));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/navbar', require('./routes/navbar'));
app.use('/api/home_page_label', require('./routes/home_page_label'));
app.use('/api/slider', require('./routes/sliders'));
app.use('/api/makeup', require('./routes/makeup'));
app.use('/api/skincare', require('./routes/skincare'));
app.use('/api/hair', require('./routes/hair'));
app.use('/api/brush', require('./routes/brush'));
app.use('/api/gift', require('./routes/gift'));
app.use('/api/collection_images', require("./routes/collection_images"));
app.use('/api/product', require('./routes/product_page_label'));
app.use('/api/basket', require('./routes/basket_page_label'));
app.use('/api/auth', require('./routes/auth_page_label'));
app.use('/api/footer', require('./routes/footer'));

// app.use('/api/footer', require('./routes/footer'));


app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port);
});
