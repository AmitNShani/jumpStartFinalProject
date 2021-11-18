import "./ProductsPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import ProductComponent from "../components/ProductComponent";
import WhoBought from "../components/WhoBought";
import { Outlet } from "react-router";

const ProductsPage = ({ store }) => {
  const [isPicked, setIsPicked] = useState(false);
  const [pickedCustomersByProduct, setPickedCustomersByProduct] = useState([]);
  const [prodName, setProdName] = useState("");

  const pickedProdFunc = (id) => {
    (async () => {
      const [{ data: customers }, { data: product }] = await Promise.all([
        axios.get(`${purchasesUrl}/by_product/${id}`),
        axios.get(`${productsUrl}/${id}`),
      ]);

      setProdName(product.name);
      setPickedCustomersByProduct(customers);
    })();

    setIsPicked(true);
  };

  const productsUrl = "http://localhost:8000/products";
  const purchasesUrl = "http://localhost:8000/purchases";

  useEffect(() => {
    store.loadAllData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mainDiv">
      <div className="headerDiv">
        <h1>
          <strong> Products Page </strong>
        </h1>
        <span>
          total amount of purchesd products: {store.getTotalPurchases}
        </span>
      </div>
      <div className="rowDiv">
        <div className="outerColDiv">
          <ProductComponent list={store.products} picked={pickedProdFunc} />
        </div>
        {isPicked && (
          <div className="outerColDiv" id="rightDiv">
            <WhoBought
              customers={pickedCustomersByProduct}
              store={store}
              prodName={prodName}
            />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default observer(ProductsPage);
