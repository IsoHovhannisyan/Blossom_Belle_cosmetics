const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const cors = require('cors');

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
  ],
  credentials: true
}));

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/navbar', require('./routes/navbar'));
app.use('/api/home_page_label', require('./routes/home_page_label'));
app.use('/api/slider', require('./routes/sliders'));
app.use('/api/makeup', require('./routes/makeup'));
app.use('/api/skincare', require('./routes/skincare'));
app.use('/api/hair', require('./routes/hair'));
app.use('/api/brush', require('./routes/brush'));
app.use('/api/collection_images', require("./routes/collection_images"));
app.use('/api/product', require('./routes/product_page_label'));

// app.use('/api/footer', require('./routes/footer'));


app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  debug('Express server listening on port ' + server.address().port);
});
