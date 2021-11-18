import {Link} from "react-router-dom";
import {useState} from 'react'
import axios from "axios";
const CustomersInProducts = ({ customer, store}) => {
    const [isPressed, setisPressed] = useState(false);
    const [prodState, setProdState] = useState(store.products[0] ? store.products[0].name: "")
    const handleChange = (e) => setProdState(e.target.value)
    const addProdToCustomer = async ()=> {
        const prod = (store.products.find((prod) => prod.name === prodState));
        const productId = prod.id;
        await axios.post(`http://localhost:8000/purchases/`,
     {customerId: customer.customer_id, productId: productId, date: (new Date()).toISOString().substring(0, 10)})}
    return (
        <div>
            <Link to={`/customers/${customer.customer_id}`} className="myLink"> {customer.first_name + " " + customer.last_name}</Link> <br />
          {`Bought at: ${customer.date}`} <br /> 
          <button onClick={(e) => setisPressed(!isPressed)}>Add product</button> <br />
          {isPressed && <><h4>Add product to costumer</h4> 
          <select value={prodState} onChange={handleChange}>
              {store.products.map((prod, index) =>  <option value={prod.name} key={index}> {prod.name}</option>)}
          </select>
           <button onClick={addProdToCustomer}>Save</button> </>
          }
         
        </div>
    )
}

export default CustomersInProducts
