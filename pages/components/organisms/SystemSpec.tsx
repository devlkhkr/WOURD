import axios from "axios";
import { useState } from "react";
import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";
import StackComponent from "../molecules/StackComponent";
import SystemDevsComponent from "../molecules/SystemDevs";

interface SystemSpecTypes extends StyledInterface {}

const StackWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 4px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

// const StackComponent = styled.li`

// `

const SystemSpec: React.FC = () => {
  const [devs, setDevs] = useState([
    {
      id: 1,
      pos: "Full-Stack Dev",
      name: "Kany Kang",
      github: "devlkhkr",
      mail: "devlkhkr@gmail.com",
      instagram: "cnpea",
    },
    {
      id: 2,
      pos: "Front-end Dev",
      name: "Amazing2bobii",
      github: "chromeheartz",
      mail: "barnesquiat@gmail.com",
      instagram: "barnesquiat",
    },
  ]);

  // Object.entries()
  // 배열로 뿌려줌.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

  // package.json 버전정보 가져와서 뿌려주게 해보기?
  const objSpecs = {
    specification: {
      nextjs: {
        name: "next-js",
        src: "spec-nextjs.png",
        by: "Vercel",
        docs: "https://nextjs.org/",
        desc: "The React Framework for Production",
      },
      react: {
        name: "react",
        src: "",
        by: "",
        docs: "",
        desc: "",
      }
    },
  };

  const getApi = async () => {
    const res = await axios.get("http://localhost:3000" + "/api/word/list");
    console.log(res);
  };

  return (
    <>
      {/* developers */}
      <section className="developers-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
        >
          Developers
        </TypoComponent>
        <StackWrap>
          {devs.map(dev => (
            <SystemDevsComponent
              key={dev.id}
              pos={dev.pos}
              name={dev.name}
              github={dev.github}
              mail={dev.mail}
              instagram={dev.instagram}
            />
          ))}
        </StackWrap>
      </section>

      {/* specification */}
      <section className="specification-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="16px"
          marginBottom="16px"
        >
          Specification
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Next-js"
            src="spec-nextjs.png"
            by="vercel"
            docs="https://nextjs.org/"
            desc="The React Framework for Production"
          />
          <StackComponent
            name="React"
            src="spec-react.png"
            by="meta"
            docs="https://reactjs.org/"
            desc="A JavaScript library for building user interfaces"
          />
          <StackComponent
            name="React-router-dom"
            src="spec-react-router-dom.png"
            by="remix"
            docs="https://reactrouter.com/en/main"
            desc="an npm package that enables you to implement dynamic routing in a web app"
          />
          
        </StackWrap>
      </section>
    </>
  );
};

export default SystemSpec;
