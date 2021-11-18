import { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";

const AddProductToUser = ({ id, firstName, lastName, products, store }) => {
  const [prodState, setProdState] = useState(products[0] ? products[0].id : "");
  const handleChange = (e) => setProdState(e.target.value);
  const addHandle = async () => {
    const resp = await axios.post(store.purchasesURL, {
      customerId: id,
      productId: prodState,
      date: new Date().toISOString().substring(0, 10),
    });
    console.log(resp);
    const { data: purchases } = await axios.get(
      "http://localhost:8000/purchases"
    );
    store.loadPurchases(purchases);
  };
  return (
    <div>
      <h1> Add a product to {`${firstName} ${lastName}`} </h1>
      <select value={prodState} onChange={handleChange}>
        {products.map((prod, index) => (
          <option value={prod.id} key={index}>
            {" "}
            {prod.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={addHandle}> Add it!</button>
    </div>
  );
};

export default observer(AddProductToUser);
