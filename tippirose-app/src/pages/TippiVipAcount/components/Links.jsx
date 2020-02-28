import React, { Fragment, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

function Links({ i, link, handleLinkChange, handleDeleteLink }) {
  return (
    <Draggable draggableId={link.id} index={i}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div
            {...provided.dragHandleProps}
            style={{ width: "100%", height: "20px", background: "black" }}
          ></div>
          <TextField
            id={link.name + link.id + 2}
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
        </div>
      )}
    </Draggable>
  );
}
export default Links;
