import React, { Fragment, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { getTippiVipAllTemplates } from "./vipAccountActions";
import { Button } from "@material-ui/core";
import AddProfileButton from "./components/AddProfileButton";

const actions = {
  getTippiVipAllTemplates
};

const mapState = state => ({
  profiles: state.vip.allTemplates
});

function TippiManageTemplate({ getTippiVipAllTemplates, profiles }) {
  useEffect(() => {
    const get = async () => {
      await getTippiVipAllTemplates();
    };
    get();
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div
        style={{
          height: 100,
          width: "100%",
          overflow: "hidden",
          background: "black"
        }}
      ></div>
      <div className="edit_links_nav_bar">
        <ul className="edit_links_nav_bar_links_wrapper center_component">
          <Link to="/account/vip/my-products">
            <li>MY PRODUCT</li>
          </Link>
          <li className="activeLink">MY PROFILE</li>
        </ul>
      </div>
      <div className="center_component p4">
        <h1>My Profiles</h1>
      </div>
      <div className="page_wrapper">
        <div style={{ textAlign: "right" }}>
          <AddProfileButton />
        </div>
        <div className="grid_4_main_wrapper">
          {profiles &&
            profiles.map(profile => (
              <Fragment key={profile.name}>
                <div className="grid_4_item_wrapper">
                  <Link to={`/account/vip/profiles/manage/${profile.name}`}>
                    <div className="profile_box_wrapper">
                      <h3>{profile.name}</h3>
                    </div>
                  </Link>
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageTemplate));
