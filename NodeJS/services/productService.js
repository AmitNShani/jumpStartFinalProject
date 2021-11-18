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
        const {rows: products} = await pool.query(`SELECT * FROM products`)
    return products;
    } catch (error) {
        return error;
    }
    
}
const getById = async (id) => {
    try {
        const {rows: product} = await pool.query(`SELECT * FROM products where id=${id}`)
        return product[0];
    } catch (error) {
        return error;
    }
}
const addProd = async (prod) => {
    try {
        await pool.query('INSERT INTO products(name, price, quantity) VALUES ($1, $2, $3)', [prod.name, prod.price, prod.quantity]);
        return `product named:${prod.name} was added to the database`
    } catch (error) {
        return error;
    }
}

const updateProd = async (id, newProd) => {
    try {

        await pool.query('UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4',
        [newProd.name, newProd.price, newProd.quantity, id])
        return `Product named:${newProd.name} was update in the database`
    } catch (error) {
        return error;
    } 
}
const deleteProd = async (id) => {
    try {
        await pool.query('DELETE FROM products WHERE id=$1', [id])
        return 'Successfully deleted product'
    } catch (error) {
        return error;
    }
}
module.exports = {getAll, addProd, deleteProd, updateProd, getById}