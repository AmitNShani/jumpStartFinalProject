import {Link} from "react-router-dom";

const ProductComponent = (props) => {
  const productList = props.list.map((prod, index) => (
    <div className="singleProdDiv" key={index}> 
        <div className="innerDiv">
            <Link className="myLink" to={`./${prod.id}`} > {prod.name}</Link> <br />   
            <strong> Price:</strong> {prod.price} <br />
            <strong> Quantity:</strong> {prod.quantity}
        </div>
        <button onClick={()=> props.picked(prod.id)}> Customers who purchases</button>
    </div>
  ));
  return <div className="colDiv">{productList}</div>;
};

export default ProductComponent;
