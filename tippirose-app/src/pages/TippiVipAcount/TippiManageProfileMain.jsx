import React, { Fragment, useState, useEffect } from "react";

// @material-ui/core components

import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTemplate } from "./vipAccountActions";
import { TextField, Button } from "@material-ui/core";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

const actions = {
  getUserTemplate
};

const mapState = state => ({
  profile: state.vip.productTemplate,
  loading: state.async.loading
});

function TippiManageProfile({ getUserTemplate, match, profile, loading }) {
  const [profileLinkState, setProfileLinkState] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    const template = match.params.profile;
    console.log(template);
    const get = async () => {
      await getUserTemplate(template);
    };
    get();
  }, []);
  useEffect(() => {
    setProfileLinkState(profile.links);
  }, [profile]);

  useEffect(() => {
    console.log("here");
    console.log(profile.links);
    console.log({ save });
    if (profileLinkState && profileLinkState === profile.links) {
      setSave(false);
      return;
    } else {
      console.log("false");
      setSave(true);
    }
  }, [profileLinkState]);

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
        <div className="manage_profile_link_box"> {link.name}</div>
      </div>
    );
  };

  if (loading) return <h1>Loading...</h1>;
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
        <br />
        <button
          onClick={() => setIsEdit(!isEdit)}
          style={{ background: `${isEdit ? "red" : "white"}` }}
        >
          edit
        </button>
        <br />
        {!isEdit && (
          <form>
            <RLDD
              items={
                profileLinkState && profileLinkState.length > 0
                  ? profileLinkState
                  : []
              }
              itemRenderer={LinkToRender}
              onChange={handleRLDDChange}
            />
            <br />
          </form>
        )}

        {isEdit && (
          <Fragment>
            <form>
              {profileLinkState &&
                profileLinkState.map((link, i) => (
                  <Fragment key={i}>
                    <TextField
                      id={link.name + link.id}
                      variant="outlined"
                      value={link.name}
                      placeholder="Titel"
                      name="name"
                      onChange={e => handleLinkChange(e, i)}
                    />
                    <br />

                    <TextField
                      variant="outlined"
                      id={link.link + link.id}
                      placeholder="http://url"
                      value={link.link}
                      name="link"
                      onChange={e => handleLinkChange(e, i)}
                    />
                    <br />
                    <button onClick={() => handleDeleteLink(i)}>Delete</button>
                    <br />
                    <br />
                  </Fragment>
                ))}
              <br />
            </form>
            <Button onClick={() => handleAddLink()}>add</Button>
          </Fragment>
        )}
        <Button
          style={{
            background: `${save ? "green" : "white"}`,
            color: `${save ? "white" : "black"}`
          }}
          onClick={handleSubmit}
          type="submit"
        >
          SAVE
        </Button>
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
