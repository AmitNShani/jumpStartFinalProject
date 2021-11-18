const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'jsFinalDB',
    password: '1111'
})

const getAll = async () => {
    try {
        const {rows: customers} = await pool.query(`SELECT * FROM customers`)
    return customers;
    } catch (error) {
        return error;
    }
    
}
const addCustomer = async (customer) => {
    try {
        await pool.query('INSERT INTO customers(first_name, last_name, city) VALUES ($1, $2, $3)', [customer.firstName, customer.lastName, customer.city]);
        return `Customer named:${customer.firstName} was added to the database`
    } catch (error) {
        return error;
    }
}

const updateCustomer = async (id, newCustomer) => {
    try {
        await pool.query('UPDATE customers SET first_name=$1, last_name=$2, city=$3 WHERE id=$4',
        [newCustomer.first_name, newCustomer.last_name, newCustomer.city, id])
        return `Customer named:${newCustomer.first_name} was updated in the database`
    } catch (error) {
        return error;
    } 
}
const deleteCustomer = async (id) => {
    try {
        await pool.query('DELETE FROM customers WHERE id=$1', [id])
        return 'successfully deleted customer'
    } catch (error) {
        return error;
    }
}
module.exports = {getAll, addCustomer, deleteCustomer, updateCustomer}