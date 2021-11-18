
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import MainStore from '../utils/MainStore'
import CustomerPage from "./CustomerPage";
import EditCustomerPage from "./EditCustomerPage";
import EditProductPage from "./EditProductPage";
import ProductsPage from "./ProductsPage";
import PurchasesPage from "./PurchasesPage";

const HomePage = () => {
  
  const mainStore = new MainStore();
 
  return (
    <BrowserRouter>
      <div className="HomePage">
        <div className="LinksMenu">
          <div className="linkDiv">
            <Link to="/products"  className="myLink main">Products </Link>
          </div>
          <div className="linkDiv">
            <Link to="/customers" className="myLink main">Customers </Link>
          </div>
          <div className="linkDiv">
            <Link to="/purchases" className="myLink main">Purchases </Link>
          </div>
        </div>
        <Routes>
          <Route path="/products"
            element={<ProductsPage store={mainStore} />}  /> 
          
            <Route path="/products/:id" element={<EditProductPage store={mainStore} />}  />
            <Route path="/customers" element={<CustomerPage store={mainStore}/>} />
            <Route path="/customers/:id" element={<EditCustomerPage store={mainStore}/>}/>  
            <Route path="/purchases" element={<PurchasesPage store={mainStore}/>} />
          
          
          <Route path="/" element={<div>Lusha's jump start final project</div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default HomePage;
