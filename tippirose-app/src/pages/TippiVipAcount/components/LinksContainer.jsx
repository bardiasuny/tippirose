import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControlLabel, Switch } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import IOSSwitch from "../../../components/CustomSwitch/IOSSwitch";
const style = {};

const useStyles = makeStyles(style);

function LinksContainer({
  link,
  handleLinkChange,
  handleDeleteLink,
  provided,
  i,
  snapshot,
  error
}) {
  const classes = useStyles();
  return (
    <Fragment>
      <div
        class="edit_links_container"
        style={{
          boxShadow: snapshot.isDragging
            ? "rgb(207, 207, 207) 15px 15px 15px"
            : "rgb(207, 207, 207) 2px 2px 4px",
          transition: "all .3s",
          background: error.includes(link.id) ? "#ffe6e6" : "white"
        }}
      >
        <div
          {...provided.dragHandleProps}
          className="edit_links_dragerber_bar"
          style={{
            background: snapshot.isDragging ? "#ebebeb" : "#fff",
            transition: "all .3s"
          }}
        >
          <MoreVertIcon style={{ color: "rgb(156, 156, 156)" }} />
        </div>
        <div className="edit_links_container_contents">
          <form autoComplete="off">
            <input
              class="edit_links_title"
              id={link.name + link.id + 2}
              value={link.name}
              placeholder="Titel"
              name="name"
              onChange={e => handleLinkChange(e, i)}
            />
            <br />

            <input
              class="edit_links_link"
              id={link.link + link.id}
              placeholder="http://url"
              value={link.link}
              name="link"
              onChange={e => handleLinkChange(e, i)}
            />
            <br />
          </form>
          <div className="edit_link_error_message">
            {error.includes(link.id) && (
              <p style={{ color: "red" }}>please fill out the fields</p>
            )}
            <p>Number of Click: {link.visited}</p>
          </div>
        </div>
        <div className="edit_links_right_actions">
          <div>
            <FormControlLabel
              control={
                <IOSSwitch
                  name="visible"
                  checked={link.visible}
                  onChange={e => handleLinkChange(e, i)}
                  color="green"
                />
              }
            />
          </div>
          <div class="edit_links_delete">
            <div onClick={() => handleDeleteLink(i)}>
              <DeleteIcon className="edit_links_delete_icon" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default LinksContainer;
