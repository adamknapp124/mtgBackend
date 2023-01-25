const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

const cardRouter = require('./routes/collection');
const setRouter = require('./routes/sets');

app.use('/collection', cardRouter);
app.use('/sets', setRouter);

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
