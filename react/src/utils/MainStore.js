import {makeObservable, observable, action, computed  } from "mobx";
import axios from "axios";

class MainStore {
    products = [];
    customers = [];
    purchases = [];
    isUpdated = false;
    productsUrl = "http://localhost:8000/products";
    customersUrl = "http://localhost:8000/customers";
    purchasesUrl = "http://localhost:8000/purchases";
    
    
    loadProducts(products){
        this.products = products;
    }
    loadCustomers(customers){
        this.customers = customers;
    }
    loadPurchases(purchases){
        this.purchases = purchases;
    }
    setUpdated(value){
        this.isUpdated = value;
    }
    async loadAllData(){
        const { data: products } = await axios.get(this.productsUrl);
        const { data: customers } = await axios.get(this.customersUrl);
        const { data: purchases } = await axios.get(this.purchasesUrl);
    
        this.loadCustomers(customers);
        this.loadProducts(products);
        this.loadPurchases(purchases);
    }
    get getTotalPurchases(){
        return this.purchases.length;
    }
    constructor(){
        makeObservable(this, {
            products: observable,   
            customers: observable,
            purchases: observable,
            isUpdated: observable,
            productsUrl: observable,
            purchasesUrl: observable,
            customersUrl: observable,
            loadAllData: action,
            loadProducts: action,
            loadPurchases: action,
            loadCustomers: action,
            setUpdated: action,
            getTotalPurchases: computed
        })
        
  
    }
}
 export default MainStore;