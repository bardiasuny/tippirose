import React, { Fragment, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import LinksContainer from "./LinksContainer";

function Links({ i, link, handleLinkChange, handleDeleteLink, error }) {
  return (
    <Draggable draggableId={link.id} index={i}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="edit_links_container_wrapper"
        >
          <LinksContainer
            link={link}
            handleLinkChange={handleLinkChange}
            handleDeleteLink={handleDeleteLink}
            provided={provided}
            i={i}
            snapshot={snapshot}
            error={error}
          />
        </div>
      )}
    </Draggable>
  );
}
export default Links;
