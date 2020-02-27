import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTemplate } from "./vipAccountActions";
import { ItemContent } from "semantic-ui-react";
import { TextField } from "@material-ui/core";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const actions = {
  getUserTemplate
};

const mapState = state => ({
  profile: state.vip.productTemplate
});

function TippiManageProfile({ getUserTemplate, match, profile }) {
  const [profileLinkState, setProfileLinkState] = useState([]);

  useEffect(() => {
    const template = match.params.profile;

    const get = async () => {
      await getUserTemplate(template);
    };
    get();
  }, []);
  useEffect(() => {
    setProfileLinkState(profile.links);
  }, [profile]);

  console.log(profileLinkState);
  const handleLinkChange = (e, i) => {
    //console.log("item", item);
    const items = [...profileLinkState];

    const item = items[i];
    console.log(item);
    item[e.target.name] = e.target.value;
    items[i] = item;
    setProfileLinkState(items);
  };

  const handleAddLink = () => {
    const items = [
      ...profileLinkState,
      { id: Math.random(), link: "", name: "" }
    ];
    setProfileLinkState(items);
  };
  const handleDeleteLink = i => {
    const items = [...profileLinkState];
    items.splice(i, 1);
    setProfileLinkState(items);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(profileLinkState);
  };

  const handleRLDDChange = newItems => {
    setProfileLinkState(newItems);
  };

  const LinkToRender = (link, i) => {
    return (
      <div key={i} className="inputs_wrapper">
        <div className="input_field">
          <div className="input_form_item">
            <TextField
              variant="outlined"
              value={link.name}
              placeholder="Titel"
              name="name"
              onChange={e => handleLinkChange(e, i)}
            />
          </div>
        </div>
        <br />
        <div className="input_field">
          <div className="input_form_item">
            <TextField
              variant="outlined"
              placeholder="http://url"
              value={link.link}
              name="link"
              onChange={e => handleLinkChange(e, i)}
            />
          </div>
        </div>
        <br />
        <button onClick={() => handleDeleteLink(i)}>Delete</button>
        <br />
        <br />
      </div>
    );
  };

  console.log(profileLinkState && profileLinkState.length);
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
      <div className=" p4 flex_column">
        <h1>Manage Profile</h1>
        {/* <input
          type="text"
          value={profileState.linkBackground}
          onChange={e =>
            setProfileState({ ...profileState, linkBackground: e.target.value })
          }
        /> */}

        <button onClick={() => handleAddLink()}>add</button>
        <form onSubmit={handleSubmit}>
          <RLDD
            items={
              profileLinkState && profileLinkState.length > 0
                ? profileLinkState
                : []
            }
            itemRenderer={LinkToRender}
            onChange={handleRLDDChange}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
