import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { productsList } from "./data2.json";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { render } from "@testing-library/react";


const Product = ({ title, category }) => {
  return (

    <article>
      <h5>{title}</h5>
      <p>{category}</p>
    </article>

  );
};

const ProductList = props => {
  const {products}  = props;

  const renderProducts = products.map(({ id, title, category }) => {
    return (
      <li key={id}>
        <Product title={title} category={category} />
      </li>
    );
  });

};


export default function Filter() {
  const [enabled, setEnabled] = React.useState(false);
  const [data, setData] = React.useState({
    products: productsList,
    categories: {
      sectionA: false,
      sectionB: false,
      sectionC: false
    }
  });


 const handleChange = (e) => {
    const  {name}  = e.target;
    console.log(name);

    setData((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name]
        }
      };
    });
    console.log(data);
  };

  const checkedProducts = Object.entries(data.categories)
    .filter((category) => category[1])
    .map((category) => category[0]);
  const filteredProducts = data.products.filter(({ category }) =>
    checkedProducts.includes(category)
  );
  console.log( filteredProducts);

  return (
    <div className="App">
      {/* <form> */}
        <div className="multiselect" onClick={() => setEnabled(!enabled)}>
          <div className="selectBox">
            <select >
              <option>Select section</option>
            </select>
            <div className="overSelect"></div>
          </div>

          <div id="checkboxes" style={{ display: enabled ? "block" : "none" }}
          >
            <label htmlFor="one">
              <Checkbox
                id="1"
                title="12 A"
                name="A section"
                handleChange={handleChange}
                checked={data.categories.A}

              />
            </label>
            <label htmlFor="two">
              <Checkbox
                id="2"
                title="12 B"
                name="B section"
                handleChange={handleChange}
                checked={data.categories.B}
              /></label>

            <label htmlFor="three">
              <Checkbox
                id="3"
                title="12 C"
                name="C section"
                handleChange={handleChange}
                checked={data.categories.C}
              />
            </label>
          </div>
        </div>
      {/* </form> */}



      <Form.Select style={{ width: "300px" }}>
        {
          filteredProducts.length === 0

            ? (<>{data.products?.map((data) => (

              <option value={data.title}>
                {data.title}
              </option>


            ))}</>)
            : (<> {filteredProducts?.map((data) => (

              <option value={data.title}>
                {data.title}
              </option>


            ))}</>)
        }
      </Form.Select>
    </div>
  );

}

