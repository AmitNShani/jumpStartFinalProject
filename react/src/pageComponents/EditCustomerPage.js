import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {Link} from "react-router-dom";


const EditCustomerPage = ({ store }) => {
    const { id } = useParams();
  
    useEffect(() => {
      if (!store.isUpdated) {
        store.loadAllData();
        store.setUpdated(true);
      }
      (async () => {
          const { data: products } = await axios.get(`${store.purchasesUrl}/by_customer/${id}`)
          setProdByCustomer(products);
      })()
          // eslint-disable-next-line
    }, []);
  
    const [prodByCustomer, setProdByCustomer] = useState([])
    const customer = store.customers.find((cust) => cust.id === +id);
    const [myInput, setInput] = useState({
      id: id,
      first_name: undefined,
      last_name: undefined,
      city: undefined,
    });
    const inputHandle = (e) =>
      setInput({ ...myInput, [e.target.name]: e.target.value });
    const updateCustomer = async () => {
      const checkedInput = Object.entries(myInput).map(([key, value]) => {
        return { [key]: value ? value : customer[key] };
      });
  
      const resp = await axios.put(
        `${store.customersUrl}/${id}`,
        Object.assign({}, ...checkedInput)
      );
      console.log(resp)
    };
    const deleteCust = async () => {
      const resp1 = await axios.delete(`${store.customersUrl}/${id}`);
      console.log(resp1)
    };
    return (
      <div className="mainDiv">
        <div className="headerDiv">
          <h1>Edit customer Page of: {customer?.first_name + " " + customer?.last_name}</h1>
        </div>
        <div className="rowDiv">
          <div className="colDiv">
            First name:
            <input
              type="text"
              placeholder="first name"
              name="first_name"
              defaultValue={customer?.first_name}
              onChange={inputHandle}
            />
            <br />
            Last name:
            <input
              type="text"
              placeholder="last name"
              name="last_name"
              defaultValue={customer?.last_name}
              onChange={inputHandle}
            />{" "}
            <br />
            city:
            <input
              type="text"
              placeholder="city"
              name="city"
              defaultValue={customer?.city}
              onChange={inputHandle}
            />
            <div>
              {" "}
              <button style={{ margin: "10px" }} onClick={updateCustomer}>
                update
              </button>{" "}
              <button style={{ margin: "10px" }} onClick={deleteCust}>
                Delete
              </button>
            </div>
          </div>
          <div className="colDiv">
            <div className="headerDiv">
              <h1>{customer?.first_name}'s products:</h1>
            </div>
            {prodByCustomer.map((product, index) => <div key={index}> <Link to={`/products/${product.product_id}`} className="myLink"> {product.name}</Link> <br /></div>)}    
          </div>
        </div>
      </div>
    );
  };

export default observer(EditCustomerPage)
