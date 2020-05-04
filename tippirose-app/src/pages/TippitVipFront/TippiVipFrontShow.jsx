import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { getTippiVipUserProduct, addLinkViewCount } from "./tippiVipActions";
import productReducer from "pages/Admin/Product/productReducer";

import TippiProductActivation from "./TippiProductActivation";
import { Button, Container } from "@material-ui/core";

import { openModal, closeModal } from "../../features/Modals/modalActions";
import Loading from "components/Loading/Loading";
import LinksItems from "../TippiVipAcount/components/LinksItems";

const style = {};

const useStyles = makeStyles(style);

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading,
  product: state.product.scannedProduct,
  template: state.vip.productTemplate
});

const actions = {
  getTippiVipUserProduct,
  openModal,
  addLinkViewCount
};

function TippiVipFrontShow({
  getTippiVipUserProduct,
  match,
  auth,
  openModal,
  profile,
  loading,
  product,
  template,
  addLinkViewCount
}) {
  const classes = useStyles();

  useEffect(() => {
    const getShow = async () => {
      await getTippiVipUserProduct(match.params.upId);
    };
    getShow();
  }, []);

  const handleAddLinkViewCount = async index => {
    const newLinks = [...template.links];
    const visitedLink = newLinks[index];
    visitedLink.visited = visitedLink.visited + 1;
    newLinks[index] = visitedLink;
    await addLinkViewCount(newLinks, template.name);
  };
console.log(template)
  if (loading) return <Loading />;
  return (
    <Fragment>
      <div
        className="center_component flex_column vip_front_link_Wrapper" 
        style={{
          background: `${template.bgColor}`,
          minHeight: "100vh",
          justifyContent: "flex-start"
        }}
      >
        {product && product.active ? (
          <Fragment>
            {product && product.template ? (
              <Fragment>
                <div className="vip_show_header">
                  <div>
                    {template.img ? (
                      <img src="" alt="profile pic" />
                    ) : (
                      <div className="center_component">
                        <div className="vip_show_no_avatar">B</div>
                      </div>
                    )}
                  </div>
                  <div
                    className="ph2 center_component"
                    style={{ color: `${template.textColor}` }}
                  >
                    {product.userName.toUpperCase()}
                  </div>
                </div>

                <LinksItems links={template && template.links} />
                <div class="vip_show_bottom_logo">
                  <Link to="/home">
                  <h2 style={{color: "white"}}>TIPPIROSE</h2>
                  </Link>
                   
                </div>
               
              </Fragment>
            ) : (
              <Fragment>
                {product.userId === auth.uid && (
                  <h5>
                    Hi {product.userName.toUpperCase()} your product is
                    activated, now you can edit your links in your{" "}
                    <Link to="/account/vip">VIP dashboard</Link>{" "}
                  </h5>
                )}

                <img
                  style={{ width: "300px" }}
                  src={product && product.mainImageUrl}
                />
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <h1>TippiADS + activation</h1>
            {auth.isLoaded && !auth.isEmpty ? (
              <Fragment>
                <TippiProductActivation
                  orderId={product && product.orderId}
                  product={product}
                  profile={profile}
                />
              </Fragment>
            ) : (
              <Fragment>
                <p>you should be signed in to activate this product</p>
                <Button onClick={() => openModal("LoginModal")}>Log In</Button>
                <Button onClick={() => openModal("SignUpModal")}>
                  Sign Up
                </Button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiVipFrontShow));
