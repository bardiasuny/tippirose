import React, { Fragment, useState, useEffect } from "react";
import Links from "./Links";
import { Droppable } from "react-beautiful-dnd";

function Column({ links, handleDeleteLink, handleLinkChange, error }) {
  return (
    <Fragment>
      <Droppable droppableId="Links-droppable">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {links &&
              links.map((link, i) => (
                <Links
                  link={link}
                  i={i}
                  key={link.id}
                  handleDeleteLink={handleDeleteLink}
                  handleLinkChange={handleLinkChange}
                  error={error}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  );
}
export default Column;
