import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTemplate } from "./vipAccountActions";
import { ItemContent } from "semantic-ui-react";
import { TextField, Button } from "@material-ui/core";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import Column from "./components/Column";
import uuid from "uuid/v4";

import { DragDropContext } from "react-beautiful-dnd";
import Loading from "../../components/Loading/Loading";

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

  const [stateLoading, setStateLoading] = useState(true);

  const [error, setError] = useState([]);

  useEffect(() => {
    setStateLoading(loading);
  }, [loading]);

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

  useEffect(() => {
    if (profileLinkState && profileLinkState === profile.links) {
      setSave(false);
      return;
    } else {
      setSave(true);
    }
  }, [profileLinkState]);

  const handleLinkChange = (e, i) => {
    const items = [...profileLinkState];

    const item = items[i];

    item[e.target.name] = e.target.value;
    items[i] = item;
    setProfileLinkState(items);
    let insideErrors = [];
    for (let i = 0; i < items.length; i++) {
      setError([]);
      const link = items[i];

      if (link.name === "" || link.link === "") {
        insideErrors = [...insideErrors, link.id];
        console.log("please fille the fields", link.id);
      }
    }
    setError(insideErrors);
  };

  const handleAddLink = () => {
    console.log("here");
    const item = [...profileLinkState, { id: `${uuid()}`, link: "", name: "" }];
    console.log(item);
    setProfileLinkState(item);
  };
  const handleDeleteLink = i => {
    const items = [...profileLinkState];
    items.splice(i, 1);
    setProfileLinkState(items);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let insideErrors = [];
    for (let i = 0; i < profileLinkState.length; i++) {
      setError([]);
      const link = profileLinkState[i];

      if (link.name === "" || link.link === "") {
        insideErrors = [...insideErrors, link.id];
        console.log("please fille the fields", link.id);
      }
    }
    setError(insideErrors);
    console.log(profileLinkState);
  };

  const handleRLDDChange = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newLinks = [...profileLinkState];

    const target = newLinks[source.index];
    newLinks.splice(source.index, 1);
    newLinks.splice(destination.index, 0, target);

    setProfileLinkState(newLinks);
  };

  if (stateLoading) return <Loading />;
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
      <div className="manage_profile_page_wrapper">
        <div className=" p4  manage_profile_links_wrapper">
          <div>
            <div
              className="edit_links_add_button"
              onClick={() => handleAddLink()}
            >
              + ADD NEW LINK
            </div>
          </div>
          <DragDropContext onDragEnd={handleRLDDChange}>
            <Column
              links={profileLinkState}
              handleDeleteLink={handleDeleteLink}
              handleLinkChange={handleLinkChange}
              error={error}
            />
          </DragDropContext>

          <div className="center_component">
            <div
              onClick={save && error.length === 0 && handleSubmit}
              className={`manage_profile_save_button ${
                save && error.length === 0
                  ? "button_active"
                  : "button_dissabled"
              }`}
            >
              SAVE
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
