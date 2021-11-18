import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import axios from "axios";
const PurchasesPage = ({ store }) => {
  const [filters, setFilters] = useState({ prodName: "", custId: "" });
  const [renderedFilters, setrenderedFilters] = useState({
    prodName: "",
    custId: "",
  });
  const [isPicked, setisPicked] = useState(false);
  const [joinedTable, setJoinedTable] = useState([]);
  const [filteredData, setFilteredData] = useState({
    customers: [],
    products: [],
  });

  useEffect(() => {
    (async () => {
      const { data: resp } = await axios.get(`${store.purchasesUrl}/all_join`);
      setJoinedTable(resp);
    })();
    store.loadAllData();
    // eslint-disable-next-line
  }, []);

  const setFilteredDataFunc = () => {
    setFilteredData({
      customers: store.customers.filter((cust) =>
        filters.custId ? cust.id === +filters.custId : true
      ),
      products: joinedTable.filter((prod) =>
        prod.name.includes(filters.prodName)
      ),
    });
    setrenderedFilters(filters);
    setisPicked(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilters({ ...filters, [name]: value });
  };
  const tableRepeater = (
    <table>
      <thead>
        <tr>
          <td>customer name</td>
          <td>purchased products</td>
          <td>purchase date</td>
        </tr>
      </thead>
      <tbody>
        {filteredData.customers.map((cust, index) => (
          <tr key={index}>
            <td>{`${cust.first_name} ${cust.last_name}`}</td>
            <td>
              <ol>
                {joinedTable
                  .filter(
                    (prod) =>
                      prod.name.includes(renderedFilters.prodName) &&
                      prod.customer_id === cust.id
                  )
                  .map((prod, index) => {
                    return <li key={prod.id}> {prod.name}</li>;
                  })}
              </ol>
            </td>
            <td>
              <ul>
                {joinedTable
                  .filter(
                    (prod) =>
                      prod.name.includes(renderedFilters.prodName) &&
                      prod.customer_id === cust.id
                  )
                  .map((prod, index) => (
                    <li key={index}> {prod.date}</li>
                  ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>
          <strong>Purchases page</strong>
        </h1>
      </div>

      <div>
        <select name="prodName" onChange={handleChange}>
          <option value="">all </option>
          {store.products.map((prod, index) => (
            <option value={prod.name} key={index}>
              {" "}
              {prod.name}
            </option>
          ))}
        </select>
        <select name="custId" onChange={handleChange}>
          <option value="">all </option>
          {store.customers.map((cust, index) => (
            <option value={cust.id} key={index}>
              {" "}
              {cust.first_name}
            </option>
          ))}
        </select>
        <button onClick={setFilteredDataFunc}>Search</button>
      </div>
      {isPicked && tableRepeater}
    </div>
  );
};

export default observer(PurchasesPage);
