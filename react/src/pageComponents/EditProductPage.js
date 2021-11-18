import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const EditProductPage = ({ store }) => {
  const { id } = useParams();

  useEffect(() => {
    if (!store.isUpdated) {
      store.loadAllData();
      store.setUpdated(true);
    }
    (async () => {
      const { data: customers } = await axios.get(
        `${store.purchasesUrl}/by_product/${id}`
      );
      setCustomerByProd(customers);
    })();
    // eslint-disable-next-line
  }, []);

  const [customersByProd, setCustomerByProd] = useState([]);
  const prod = store.products.find((prod) => prod.id === +id);
  const [myInput, setInput] = useState({
    id: id,
    name: undefined,
    price: undefined,
    quantity: undefined,
  });
  const inputHandle = (e) =>
    setInput({ ...myInput, [e.target.name]: e.target.value });
  const updateProd = async () => {
    const checkedInput = Object.entries(myInput).map(([key, value]) => {
      return { [key]: value ? value : prod[key] };
    });

    const resp = await axios.put(
      `${store.productsUrl}/${id}`,
      Object.assign({}, ...checkedInput)
    );
  };

  const deleteProd = async () => {
    const resp1 = await axios.delete(`${store.productsUrl}/${id}`);
  };

  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>Edit Product Page of: {prod?.name}</h1>
      </div>
      <div className="rowDiv">
        <div className="colDiv">
          Name:
          <input
            type="text"
            placeholder="Name"
            name="name"
            defaultValue={prod?.name}
            onChange={inputHandle}
          />
          <br />
          Price:
          <input
            type="text"
            placeholder="Price"
            name="price"
            defaultValue={prod?.price}
            onChange={inputHandle}
          />{" "}
          <br />
          Quantity:
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            defaultValue={prod?.quantity}
            onChange={inputHandle}
          />
          <div>
            {" "}
            <button style={{ margin: "10px" }} onClick={updateProd}>
              update
            </button>{" "}
            <button style={{ margin: "10px" }} onClick={deleteProd}>
              Delete
            </button>
          </div>
        </div>
        <div className="colDiv">
          <div className="headerDiv">
            <h1>{prod?.name}'s customers:</h1>
          </div>
          {customersByProd.map((customer, index) => (
            <div key={index}>
              {" "}
              <Link
                to={`/customers/${customer.customer_id}`}
                className="myLink"
              >
                {" "}
                {customer.first_name + " " + customer.last_name}
              </Link>{" "}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(EditProductPage);
