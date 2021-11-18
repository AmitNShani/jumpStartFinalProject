import {Link} from "react-router-dom";
import axios from "axios";
import { observer} from "mobx-react-lite";
import { useState, useEffect } from "react";
const CustomersComponent = (props) => { 
    const [customers, setCustomers] = useState([]);
    
   useEffect(() => {
       (async ()=> {
        const {data: customers} = await axios.get(`${props.store.purchasesUrl}/product_join_purchase`)
        setCustomers(customers);
       })()
       
       // eslint-disable-next-line
   }, [props.store.purchases])
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        customer
                    </th>
                    <th>
                        products
                    </th>
                    <th>
                        purchase date
                    </th>
                </tr>
            </thead>
            <tbody>
               { props.customers.map((customer, index) => 
                {
                    
                    return <tr key={index}>
                    <td> 
                        <Link to=
                        {`/customers/${customer.id}`} className="myLink"> {customer.first_name + " " + customer.last_name}
                        </Link> <br />
                         <button onClick={() => props.picked(customer)}>Add products</button>
                    </td>
                    <td>
                        <ol>
                            {customers.filter((customer1)=> customer1.customer_id === customer.id).map((e, i)=> 
                                <li key={i}><Link to={`/products/${e.product_id}`}> {e.name}</Link> <br /></li>)}
                        </ol>
                        
                    </td>
                    <td>
                        
                                {customers.filter((customer1)=> customer1.customer_id === customer.id).map((e, i)=> 
                                    <span key={i}>{e.date} <br /></span>)}
                        
                    </td>
               </tr>})}
            </tbody>
        </table>
    )
}

export default observer(CustomersComponent)
