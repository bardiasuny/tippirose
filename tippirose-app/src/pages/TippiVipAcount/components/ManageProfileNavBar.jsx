import React, { Fragment } from "react";

function ManageProfileNavBar({ setShowsection, profile, showSection }) {
  return (
    <Fragment>
      <div className="edit_links_nav_bar">
        <ul className="edit_links_nav_bar_links_wrapper center_component">
          <li className="edit_links_nav_bar_profile_name">
            <p>{profile && profile.name}</p>
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
    </Fragment>
  );
}
export default ManageProfileNavBar;
