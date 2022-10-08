import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/scss/import/_common.module.scss";

const Header: React.FC = () => {
  return (
    <header>
      {/* <FontAwesomeIcon icon="fa-brands fa-discord" /> */}
      <div className="header-logo">
        <FontAwesomeIcon icon={faBolt} />
        <h1 className={styles.tit_header_logo}>hello</h1>
      </div>
    </header>
  );
};

export default Header;
