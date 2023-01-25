const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/addSets', (req, res) => {
	const set = req.body;
	const query = `INSERT INTO sets (set_name) VALUES ('${set.name.replace(
		/'/g,
		"''"
	)}')`;
	db.query(query, (err, result) => {
		if (err) throw err;
		console.log(`${set.name} added to the sets table`);
		res.status(201).send('Set added to the database');
	});
});

router.get('/setNames', (req, res) => {
	const query = 'SELECT set_name FROM sets';
	db.query(query, (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error fetching sets from database' });
		} else {
			const setNames = results.map((result) => result.set_name);
			res.json(setNames);
			console.log(typeof setNames);
		}
	});
});

module.exports = router;
