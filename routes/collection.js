const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/addCard', (req, res) => {
	const {
		name,
		mana_cost,
		colors,
		cmc,
		type_line,
		set_name,
		rarity,
		keywords,
		oracle_text,
		power,
		toughness,
		image_uris,
		prices,
		legalities,
	} = req.body;

	const statement =
		'INSERT INTO collection (name, mana_cost, colors, cmc, type_line, set_name, rarity, keywords, oracle_text, power, toughness, image_uri, price, foil_price, legalities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	const values = [
		name,
		mana_cost,
		JSON.stringify(colors),
		cmc,
		type_line,
		set_name,
		rarity,
		JSON.stringify(keywords),
		oracle_text,
		power,
		toughness,
		image_uris.small,
		prices.usd,
		prices.usd_foil,
		JSON.stringify(legalities),
	];

	db.query(statement, values, function (err, result) {
		if (err) {
			console.log(err);
			res
				.status(500)
				.json({ message: 'Error inserting data into the database' });
		} else {
			console.log(`Added card with name: ${name}`);
			res.json({ message: `${name} inserted successfully` });
		}
	});
});

router.delete('/deleteCard', (req, res) => {
	const name = req.body.name;
	const statement = 'DELETE FROM collection WHERE name = ? LIMIT 1';
	const values = [name];

	// execute the DELETE statement and handle any errors
	db.query(statement, values, (error, results) => {
		if (error) {
			console.log(error);
			res.status(500).send('Failed to delete card');
		} else {
			console.log(`Deleted card with name: ${name}`);
			res.status(200).send(`${name} deleted successfully`);
		}
	});
});

router.get('/collection', (req, res) => {
	const query = 'SELECT * FROM collection';
	db.query(query, (err, results) => {
		if (err) {
			console.error(err);
			res
				.status(500)
				.json({ message: 'Error fetching data from the database' });
		} else {
			res.json(results);
		}
	});
});

router.get('/priceCards', (req, res) => {
	const query = 'SELECT * FROM collection';
	db.query(query, (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: 'Error retrieving price data' });
		} else {
			console.log(results);
			res.json(results);
		}
	});
});

module.exports = router;
