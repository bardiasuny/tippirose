import React, { Fragment } from "react";

// @material-ui/core components
import Favorite from "@material-ui/icons/Favorite";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

function MyProducts({ products, templates, assignVipTemplate }) {
  return (
    <Fragment>
      {products &&
        products.map(product => (
          <Fragment key={product.productID}>
            <div className="grid_4_item_wrapper" key={product.id}>
              <div className="grid_4_product_wrapper">
                <div className="grid_image_with">
                  <img
                    src={product && product.mainImageUrl}
                    alt={product.productName && product.productName}
                  />
                  <div className="grid_product_footer_wrapper">
                    <div>
                      <h4>
                        {product && product.productName && product.productName}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <FormControl
                variant="outlined"
                style={{ width: "100%", marginTop: 10 }}
              >
                <InputLabel
                  //ref={inputLabel}
                  htmlFor="outlined-age-native-simple"
                >
                  Templates
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  for="outlined-error-helper-text"
                  value={product.template && product.template}
                  onChange={e => assignVipTemplate(e.target.value, product)}
                  labelWidth={100}
                  inputProps={{
                    name: "templates",
                    id: "template_selector"
                  }}
                  className="select_options"
                >
                  {templates &&
                    templates.map(template => (
                      <MenuItem value={template.name} key={template.name}>
                        {template.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <br />
            <br />
          </Fragment>
        ))}
    </Fragment>
  );
}
export default MyProducts;
