const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();


router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSpecificContact);

module.exports = router;