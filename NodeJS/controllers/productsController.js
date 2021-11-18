const express = require('express');
const router = express.Router();
const productService = require('../services/productService') 


router.route('/').get(async (req, res) => { 
    try {
        const products = await productService.getAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error)
    }

}).post(async (req, res) => {
    try {
        const product = req.body;
        const result = await productService.addProd(product);
        return res.status(202).json(result);
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productService.getById(id);
        return res.status(200).json(result)
        
    } catch (error) {
        return res.status(400).json(error)
    }
})
.put(async (req, res) => {
    try {
        const id = req.params.id;
        const updateProd = req.body;
        const result = await productService.updateProd(id, updateProd);
        return res.status(200).json(result)
        
    } catch (error) {
        return res.status(400).json(error)
    }
}).delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productService.deleteProd(id)
        return res.status(200).json(result)       
    } catch (error) {
        return res.status(400).json(error)

    }
})

module.exports = router