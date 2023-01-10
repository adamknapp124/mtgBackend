const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(cors(), bodyParser.json());

const db = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

app.listen(3001, () => {
	console.log('Server running, better go catch it!');
});
