
import { Children } from "react";
import { Route, Routes, Link, BrowserRouter, useRoutes,Outlet } from "react-router-dom";
import EditProductPage from "../pageComponents/EditProductPage";
import ProductsPage from "../pageComponents/ProductsPage";
import MainStore from "../utils/MainStore";



const Router = () => {
    const mainStore = new MainStore();

    const routes =useRoutes([
        {path:'/products',  element: <ProductOutlet  />, 
        children:[
            {path:'/products',  element: <ProductsPage store={mainStore} />},
            {path:':id', element: <h1>Hii</h1>}
        ]
    }
    ]);


    return routes;
}


const ProductOutlet = ( ) => {

    return (
        <Outlet />
    )
}

export default Router;