const express = require('express');
const router = express.Router();
const customersService = require('../services/customersService') 


router.route('/').get(async (req, res) => { 
    try {
        const customer = await customersService.getAll();
        return res.status(200).json(customer);
    } catch (error) {
        return res.status(400).json(error)
    }

}).post(async (req, res) => {
    try {
        const customer = req.body;
        const result = await customersService.addCustomer(customer);
        return res.status(202).json(result);
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.route('/:id').put(async (req, res) => {
    try {
        const id = req.params.id;
        const updateCustomer = req.body;
        const result = await customersService.updateCustomer(id, updateCustomer);
        return res.status(200).json(result)
        
    } catch (error) {
        return res.status(400).json(error)
    }
}).delete(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await customersService.deleteCustomer(id)
        return res.status(200).json(result)       
    } catch (error) {
        return res.status(400).json(error)

    }
})

module.exports = router