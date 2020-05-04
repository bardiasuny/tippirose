import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function ManageProfileNavBar({ setShowsection, profile, showSection }) {
  return (
    <Fragment>
      <div className="edit_links_nav_bar">
        <div className="edit_links_nav_bar_back_title">
          <Link exact to="/account/vip/profiles">
            <div className="flex_row">
              <ArrowBackIosIcon />
              <p>{profile && profile.name}</p>
            </div>
          </Link>
        </div>

        <ul className="edit_links_nav_bar_links_wrapper center_component">
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
    </Fragment>
  );
}
export default ManageProfileNavBar;
