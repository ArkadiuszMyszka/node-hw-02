import express from 'express'

import { indexContacts } from '../../controllers/contacts/indexContacts.js';
import {showContacts} from '../../controllers/contacts/showContacts.js';
// import {deleteContacts} from '../../controllers/contacts/deleteContacts.js';
// const updateContacts = require('../../controllers/contacts/updateContacts');
// import createContacts from '../../controllers/contacts/createContacts.js';

const router = express.Router()
 router.get('/', indexContacts)

router.get('/:contactId', showContacts)

// router.post('/', createContacts)

// router.delete('/:contactId', deleteContacts)

// router.put('/:contactId', updateContacts)

export { router }
