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

import uuid from "uuid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const itemsFromBackend = [
  { id: uuid(), content: "first Task" },
  { id: uuid(), content: "Second task" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "TODO",
    items: itemsFromBackend
  }
};

const actions = {
  getUserTemplate
};

const mapState = state => ({
  profile: state.vip.productTemplate
});

function TippiManageProfile({ getUserTemplate, match, profile }) {
  const [profileLinkState, setProfileLinkState] = useState([]);
  const [profileColumnState, setProfileColumnState] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);

  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    const template = match.params.profile;

    const get = async () => {
      await getUserTemplate(template);
    };
    get();
  }, []);
  useEffect(() => {
    setProfileLinkState(profile.links);
    setProfileColumnState(profile.columns);
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

  console.log(
    profileColumnState && profileColumnState[0] && profileColumnState[0].linkId
  );
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

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <Fragment>
      <h1>Manage Profile</h1>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={id}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.dropplableProps}
                        ref={provided.innderRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 2,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innderRef}
                                    innderRef={provided.innderRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 15,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      <Fragment>
        {/* <form>
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
          </form> */}
        <Button onClick={() => handleAddLink()}>add</Button>
      </Fragment>

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
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
