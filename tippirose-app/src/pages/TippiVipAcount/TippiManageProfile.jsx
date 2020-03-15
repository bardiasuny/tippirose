import React, { Fragment, useState, useEffect } from "react";

// @material-ui/core components
import NavBar from "components/Nav/MainNavBar/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserTemplate, setProfileLinks } from "./vipAccountActions";
import Column from "./components/Column";
import uuid from "uuid/v4";

import { DragDropContext } from "react-beautiful-dnd";
import Loading from "../../components/Loading/Loading";
import Alert from "@material-ui/lab/Alert";

import LinksDisplaySection from "./components/LinksDisplaySection";
import ManageProfileNavBar from "./components/ManageProfileNavBar";
import ManageTheme from "./components/ManageTheme";

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

    if (e.target.name === "link") {
      const link = e.target.value;

      switch (true) {
        case link.includes("facebook"):
          item.brand = "facebook";
          item.bgColor = "#3C5A99";
          item.textColor = "#fff";
          break;
        case link.includes("instagram"):
          item.brand = "instagram";
          item.bgColor = "#fff";
          item.textColor = "#000";
          break;
        case link.includes("twitter"):
          item.brand = "twitter";
          item.bgColor = "#28ABE1";
          item.textColor = "#fff";
          break;
        case link.includes("youtube"):
          item.brand = "youtube";
          item.bgColor = "#f00";
          item.textColor = "#fff";
          break;
        case link.includes("linkedin"):
          item.brand = "linkedin";
          item.bgColor = "#0279B4";
          item.textColor = "#fff";
          break;
        case link.includes("pintrest"):
          item.brand = "pintrest";
          item.bgColor = "#e60524";
          item.textColor = "#fff";
          break;
        case link.includes("amazon"):
          item.brand = "amazon";
          item.bgColor = "#f90";
          item.textColor = "#fff";
          break;
        case link.includes("ebay"):
          item.brand = "ebay";
          item.bgColor = "#fff";
          item.textColor = "#fff";
          break;
        default:
          item.brand = "";
          item.bgColor = "#e3e3e3";
          item.textColor = "#000";
      }
    }

    if (e.target.name === "visible") {
      item[e.target.name] = !item.visible;
    } else {
      item[e.target.name] = e.target.value;
    }

    items[i] = item;

    setProfileLinkState(items);
    console.log(profileLinkState);
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
          <ManageProfileNavBar
            setShowsection={setShowsection}
            showSection={showSection}
            profile={profile}
          />
          <div className="edit_link_visits">
            <Alert severity="info">Visited: {profileState.visited}</Alert>
            <p></p>
          </div>

          {showSection === "theme" && (
            <Fragment>
              <ManageTheme
                handleThemeChange={handleThemeChange}
                profileState={profileState}
              />
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
          <LinksDisplaySection
            profileState={profileState}
            profileLinkState={profileLinkState}
          />
        </div>
        {showSection === "preview" && (
          <div
            className="manage_links_display_section_mobile"
            style={{ display: "flex" }}
          >
            <LinksDisplaySection
              profileState={profileState}
              profileLinkState={profileLinkState}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiManageProfile));
