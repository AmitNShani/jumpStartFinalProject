import "./ProductsPage.css";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import CustomersComponent from "../components/CustomersComponent";
import AddProductToUser from "../components/AddProductToUser";
const CustomerPage = ({ store }) => {
  const [isPicked, setIsPicked] = useState(false);
  const [picked, setPicked] = useState(undefined);

  useEffect(() => {
    store.loadAllData();
    // eslint-disable-next-line
  }, []);

  const pickedCustFunc = async (customer) => {
    setPicked(customer);
    setIsPicked(true);
    
  };
  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>
          <strong> Customer Page </strong>
        </h1>
      </div>
      <div className="rowDiv">
        <div className="outerColDiv">
          <h2>customers information</h2>
          <CustomersComponent
            store={store}
            customers={store.customers}
            picked={pickedCustFunc}
          />
        </div>
        {isPicked && (
          <div className="outerColDiv" id="rightDiv">
           {isPicked && <AddProductToUser id={picked.id} store={store}
           firstName={picked.first_name} lastName={picked.last_name} products={store.products}/> }
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(CustomerPage);
