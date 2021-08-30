import express from 'express';
import { create, list, categoryById, read, update, remove } from '../controller/category';

const router = express.Router();
//Add Product
router.post('/category/create', create);
//List
router.get('/category/list', list);
//Lấy Id
router.param('categoryId', categoryById);
//
router.get('/category/:categoryId', read);
//
router.put('/category/:categoryId', update);
//
router.delete('/category/:categoryId', remove);
module.exports = router;