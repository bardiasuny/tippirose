import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Image from "material-ui-image";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { getPlainProductsCategory } from "./plainProductActions";
import { useEffect } from "react";

const mapState = (state) => ({
  tshirts: state.firestore.ordered.tshirt,
});

const actions = {
  getPlainProductsCategory,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  tableWrapper: {
    width: "100%",
  },
  table: {
    minWidth: 800,
  },
});

const PlainProducts = ({ getPlainProductsCategory, tshirts }) => {
  const classes = useStyles();
  useEffect(() => {
    getPlainProductsCategory("tshirt");
  }, []);
  return (
    <div>
      <h2>Plain product manager</h2>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="left">Product Name</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tshirts &&
              tshirts.map((tshirt) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      to={`/admin/plain-product-manager/add-product/${tshirt.id}`}
                    >
                      <Image
                        src={
                          tshirt.image ||
                          "https://xabikos.gallerycdn.vsassets.io/extensions/xabikos/reactsnippets/2.4.0/1572385230369/Microsoft.VisualStudio.Services.Icons.Default"
                        }
                        disableSpinner
                      />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{tshirt.manufacturerBrand}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>Edit</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(mapState, actions)(PlainProducts);
