const express = require('express');
const router = express.Router();
const quoteCtrl = require('../controllers/quotes');

router.post('/supers/:id', quoteCtrl.create);
router.delete('/quotes/:id', quoteCtrl.delete);

module.exports = router;
