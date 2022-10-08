import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPoo } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="inner">
        <ul>
          <li>
            <FontAwesomeIcon icon={faPoo} />
            <span>메인</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPoo} />
            <span>단어장</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPoo} />
            <span>단어관리</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPoo} />
            <span>설정</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
