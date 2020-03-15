import React, { Fragment } from "react";

function ManageTheme({ handleThemeChange, profileState }) {
  return (
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
  );
}
export default ManageTheme;
