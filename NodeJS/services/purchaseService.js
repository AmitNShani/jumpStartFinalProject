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
        const {rows: purchases} = await pool.query(`SELECT * FROM purchases`)
    return purchases;
    } catch (error) {
        return error;
    }
    
}
const getUsersByProduct = async (id) => {
    try {
        const {rows: users} = await pool.query(`SELECT * FROM customers JOIN purchases  ON (purchases.customer_id = customers.id) where product_id='${id}'`)

    return users;
    } catch (error) {
        return error;
    }
}

const getProductsByUser = async (id) => {
    try {
        const {rows: products} = await pool.query(`SELECT * FROM products as prod JOIN purchases as pur  ON (pur.product_id = prod.id) where customer_id='${id}'`)

    return products;
    } catch (error) {
        return error;
    }
}
const getProductsJoinpurchases = async () => {
    try {
        const {rows: products} = await pool.query(`SELECT * FROM products as prod JOIN purchases as pur  ON (pur.product_id = prod.id)`)

    return products;
    } catch (error) {
        return error;
    }
}
const getJoinAll = async () => {
    try {
        const {rows: allJoined} = await pool.query(`SELECT * FROM customers as l JOIN 
        (SELECT * FROM products as prod JOIN purchases as pur  ON (pur.product_id = prod.id)) as r ON(l.id = r.customer_id)`)

    return allJoined;
    } catch (error) {
        return error;
    }
}
const addPurchase = async (purchase) => {
    try {
        await pool.query('INSERT INTO purchases(customer_id, product_id, date) VALUES ($1, $2, $3)', [purchase.customerId, purchase.productId, purchase.date]);
        return `new purchase was add`
    } catch (error) {
        return error;
    }
}

const updatePurchase = async (id, newPurchase) => {
    try {

        await pool.query('UPDATE purchases SET customer_id=$1, product_id=$2, date=$3 WHERE id=$4',
        [newPurchase.customerId, newPurchase.productId, newPurchase.date, id])
        return `Purchase with id number : ${id} was updated`
    } catch (error) {
        return error;
    } 
}
const deletePurchase = async (id) => {
    try {
        await pool.query('DELETE FROM purchases WHERE id=$1', [id])
        return `Purchase with id number : ${id} was deleted`
    } catch (error) {
        return error;
    }
}

const deletePurchasesByProducts = async (id) => {
    try {
        await pool.query('DELETE FROM purchases WHERE product_id=$1', [id])
        return `Purchase with id number : ${id} was deleted`
    } catch (error) {
        return error;
    }
}
module.exports = {getAll, addPurchase, deletePurchase, updatePurchase, getUsersByProduct, deletePurchasesByProducts,
getProductsByUser, getProductsJoinpurchases, getJoinAll}