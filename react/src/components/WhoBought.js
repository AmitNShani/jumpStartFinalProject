import CustomersInProducts from "./CustomersInProducts";


const WhoBought = ({ customers, store, prodName}) => {
    const startsWithVowel = word => /[aeiou]/i.test(word[0]);
    const aOrAn = word => startsWithVowel(word)? 'an': 'a';
  return (
    <div className="colDiv">
        <div className="headerDiv" name=""> <h1>{`customers who bought ${aOrAn(prodName)} ${prodName}`}</h1></div>
      {customers.map((customer, index) => (
        <div className="singleCustomerDiv" key={index}>
            <CustomersInProducts key={index} customer={customer} store={store}/>
          
        </div>
      ))}
    </div>
  );
};

export default WhoBought;
