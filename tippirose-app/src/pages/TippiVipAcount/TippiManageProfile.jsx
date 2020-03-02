import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTemplate, setProfileLinks } from "./vipAccountActions";
import { ItemContent } from "semantic-ui-react";
import { TextField, Button } from "@material-ui/core";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import Column from "./components/Column";
import uuid from "uuid/v4";

import { DragDropContext } from "react-beautiful-dnd";
import Loading from "../../components/Loading/Loading";
import Alert from "@material-ui/lab/Alert";

const actions = {
  getUserTemplate,
  setProfileLinks
};

const mapState = state => ({
  profile: state.vip.productTemplate,
  loading: state.async.loading
});

function TippiManageProfile({
  getUserTemplate,
  match,
  profile,
  loading,
  setProfileLinks
}) {
  const [profileLinkState, setProfileLinkState] = useState([]);
  const [profileState, setProfileState] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);

  const [showSection, setShowsection] = useState("links");

  const [stateLoading, setStateLoading] = useState(true);

  const [error, setError] = useState([]);

  const [theme, setTheme] = useState([]);

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
    setProfileState(profile);
  }, [profile]);

  useEffect(() => {
    if (
      profileLinkState &&
      profileLinkState === profile.links &&
      profileState &&
      profileState.theme === profile.theme
    ) {
      setSave(false);
      return;
    } else {
      setSave(true);
    }
  }, [profileLinkState, profileState]);

  const handleLinkChange = (e, i) => {
    const items = [...profileLinkState];

    const item = items[i];

    if (e.target.name === "visible") {
      item[e.target.name] = !item.visible;
    } else {
      item[e.target.name] = e.target.value;
    }

    items[i] = item;

    setProfileLinkState(items);

    let insideErrors = [];
    for (let i = 0; i < items.length; i++) {
      setError([]);
      const link = items[i];

      if (link.name === "" || link.link === "") {
        insideErrors = [...insideErrors, link.id];
      }
    }
    setError(insideErrors);
  };

  const handleAddLink = () => {
    console.log("here");
    const item = [
      ...profileLinkState,
      { id: `${uuid()}`, link: "", name: "", visible: true, visited: 0 }
    ];
    console.log(item);
    setProfileLinkState(item);
  };
  const handleDeleteLink = i => {
    const items = [...profileLinkState];
    items.splice(i, 1);
    setProfileLinkState(items);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let insideErrors = [];
    for (let i = 0; i < profileLinkState.length; i++) {
      setError([]);
      const link = profileLinkState[i];

      if (link.name === "" || link.link === "") {
        insideErrors = [...insideErrors, link.id];
      }
    }

    const profileName = match.params.profile;
    if (insideErrors.length > 1) {
      setError(insideErrors);
      return;
    } else {
      await setProfileLinks(profileName, profileLinkState, profileState);
      await getUserTemplate(profileName);
    }
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

  const handleThemeChange = theme => {
    if (theme === "dark") {
      setProfileState({
        bgColor: "black",
        linkBackground: "",
        textColor: "white",
        theme: theme
      });
    } else {
      setProfileState({
        bgColor: "white",
        linkBackground: "#e7e7ff",
        textColor: "black",
        theme: theme
      });
    }
  };

  if (stateLoading) return <Loading />;
  return (
    <Fragment>
      <NavBar />
      <div
        style={{
          height: 85,
          width: "100%",
          overflow: "hidden",
          background: "black"
        }}
      ></div>
      <div className="manage_profile_page_wrapper">
        <div className="manage_profile_links_wrapper">
          <div className="edit_links_nav_bar">
            <ul className="edit_links_nav_bar_links_wrapper center_component">
              <li className="edit_links_nav_bar_profile_name">
                <p>{profile.name.toUpperCase()}</p>
              </li>
              <li
                className={showSection === "links" ? "activeLink" : ""}
                onClick={() => setShowsection("links")}
              >
                LINKS
              </li>
              <li
                className={showSection === "theme" ? "activeLink" : ""}
                onClick={() => setShowsection("theme")}
              >
                THEME
              </li>
              <li
                className={showSection === "picture" ? "activeLink" : ""}
                onClick={() => setShowsection("picture")}
              >
                PICTURE
              </li>
              <div className="mainNav-mobile">
                <li
                  className={showSection === "preview" ? "activeLink" : ""}
                  onClick={() => setShowsection("preview")}
                >
                  PREVIEW
                </li>
              </div>
            </ul>
          </div>
          <div className="edit_link_visits">
            <Alert severity="info">Visited: {profileState.visited}</Alert>
            <p></p>
          </div>

          {showSection === "theme" && (
            <Fragment>
              <div className="theme_section_wrapper center_component flex_column">
                <div
                  onClick={() => handleThemeChange("dark")}
                  className={`theme_select_theme_wapper ${
                    profileState.theme === "dark" ? "active_theme_button" : ""
                  }`}
                >
                  DARK THEME
                </div>
                <div
                  onClick={() => handleThemeChange("light")}
                  className="theme_select_theme_wapper"
                  className={`theme_select_theme_wapper ${
                    profileState.theme === "light" ? "active_theme_button" : ""
                  }`}
                >
                  LIGHT THEME
                </div>
              </div>
            </Fragment>
          )}

          {showSection === "links" && (
            <div className="edit_links_links_container">
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
            </div>
          )}
          <div className="center_component">
            <div
              onClick={save && error.length === 0 ? handleSubmit : null}
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
        <div className="manage_links_display_section">
          <div
            className="manage_links_display_wrapper"
            style={{ background: profileState.bgColor }}
          >
            <div
              className="links_display_tippi_branding"
              style={{ background: profileState.bgColor }}
            >
              <p style={{ color: `${profileState.textColor}` }}>TIIPIROSE</p>
            </div>
            <div
              style={{
                width: "100%"
              }}
              className="center_component flex_column"
            >
              <div className="center_component">
                <div className="vip_show_header">
                  <div>
                    {profileState.img ? (
                      <img src="" alt="profile pic" />
                    ) : (
                      <div className="vip_show_no_avatar">B</div>
                    )}
                  </div>
                  <div
                    className="ph2 center_component"
                    style={{ color: `${profileState.textColor}` }}
                  >
                    {/* {product.userName.toUpperCase()} */}
                  </div>
                </div>
              </div>
              {profileLinkState &&
                profileLinkState.map(link => (
                  <Fragment>
                    {link.visible && (
                      <div
                        style={{
                          background: `${profileState.linkBackground}`
                        }}
                        className="vip_show_Links"
                      >
                        <a href={link.link} target="_blank">
                          <p style={{ color: `${profileState.textColor}` }}>
                            {link.name}
                          </p>
                        </a>
                      </div>
                    )}
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
        {showSection === "preview" && (
          <div
            className="manage_links_display_section_mobile"
            style={{ display: "flex" }}
          >
            <div
              className="manage_links_display_wrapper"
              style={{ background: profileState.bgColor }}
            >
              <div
                className="links_display_tippi_branding"
                style={{ background: profileState.bgColor }}
              >
                <p style={{ color: `${profileState.textColor}` }}>TIIPIROSE</p>
              </div>
              <div
                style={{
                  width: "100%"
                }}
                className="center_component flex_column"
              >
                <div className="center_component">
                  <div className="vip_show_header">
                    <div>
                      {profileState.img ? (
                        <img src="" alt="profile pic" />
                      ) : (
                        <div className="vip_show_no_avatar">B</div>
                      )}
                    </div>
                    <div
                      className="ph2 center_component"
                      style={{ color: `${profileState.textColor}` }}
                    >
                      {/* {product.userName.toUpperCase()} */}
                    </div>
                  </div>
                </div>
                {profileLinkState &&
                  profileLinkState.map(link => (
                    <Fragment>
                      {link.visible && (
                        <div
                          style={{
                            background: `${profileState.linkBackground}`
                          }}
                          className="vip_show_Links"
                        >
                          <a href={link.link} target="_blank">
                            <p style={{ color: `${profileState.textColor}` }}>
                              {link.name}
                            </p>
                          </a>
                        </div>
                      )}
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
