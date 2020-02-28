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
      <div className=" p4 flex_column">
        <h1>Manage Profile</h1>
        <DragDropContext onDragEnd={handleRLDDChange}>
          <Column
            links={profileLinkState}
            handleDeleteLink={handleDeleteLink}
            handleLinkChange={handleLinkChange}
          />
        </DragDropContext>

        <Button onClick={() => handleAddLink()}>add</Button>

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
