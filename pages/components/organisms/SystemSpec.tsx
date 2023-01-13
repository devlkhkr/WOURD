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
      },
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
          paddingLeft="4px"
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
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
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
          <StackComponent
            name="TypeScript"
            src="spec-typescript.png"
            by="microsoft"
            docs="https://www.typescriptlang.org/"
            desc="TypeScript is a strongly typed programming language that builds on JavaScript"
          />
          <StackComponent
            name="Next-seo"
            src="spec-nextjs.png"
            by="vercel"
            docs="https://nextjs.org/learn/seo/introduction-to-seo"
            desc="a plugin that makes managing your SEO easier in Next.js projects."
          />
        </StackWrap>
      </section>

      {/* Auth */}
      <section className="auth-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          Auth
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Next-auth"
            src="spec-nextauth.png"
            by="vercel"
            docs="https://next-auth.js.org/"
            desc="A complete open-source authentication solution for Next.js applications."
          />
          <StackComponent
            name="Crypto-js"
            src="spec-crypto.png"
            by="open source"
            docs="https://cryptojs.gitbook.io/docs/"
            desc="JavaScript implementations of standard and secure cryptographic algorithms"
          />
          <StackComponent
            name="Uuid4"
            src="spec-uuid4.png"
            by="open source"
            docs="https://github.com/tracker1/node-uuid4"
            desc="A Node.js module for generating and validation V4 UUIDs"
          />
          <StackComponent
            name="Validator"
            src="spec-validator.png"
            by="open source"
            docs="https://github.com/validatorjs/validator.js"
            desc="A library of string validators and sanitizers."
          />
          <StackComponent
            name="Password Validator"
            src="spec-pwvalidator.png"
            by="open source"
            docs="https://github.com/tarunbatra/password-validator#readme"
            desc="Validates password according to flexible and intuitive specifications"
          />
          <StackComponent
            name="Cors"
            src="spec-cors.png"
            by="express"
            docs="https://expressjs.com/en/resources/middleware/cors.html"
            desc="CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options."
          />
          <StackComponent
            name="Node-Mailer"
            src="spec-nodemailer.png"
            by="emailengine"
            docs="https://nodemailer.com/about/"
            desc="Nodemailer is a module for Node.js applications to allow easy as cake email sending."
          />
        </StackWrap>
      </section>

      {/* state management */}
      <section className="state-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          State Management
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Redux-Toolkit"
            src="spec-redux.svg"
            by="dan abramov"
            docs="https://redux-toolkit.js.org/"
            desc="The Redux Toolkit package is intended to be the standard way to write Redux logic."
          />
        </StackWrap>
      </section>

       {/* view */}
       <section className="view-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          View
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Sass"
            src="spec-sass.png"
            by="macstadium"
            docs="https://sass-lang.com/"
            desc="Sass is the most mature, stable, and powerful professional grade CSS extension language in the world."
          />
          <StackComponent
            name="Styled-Component"
            src="spec-styledcomponent.png"
            by="open source"
            docs="https://styled-components.com/"
            desc="Visual primitives for the component age."
          />
          <StackComponent
            name="Font-Awesome"
            src="spec-fontawesome.svg"
            by="Dave Gandy"
            docs="https://fontawesome.com/"
            desc="Take the hassle out of icons"
          />
          <StackComponent
            name="Font-Awesome"
            src="spec-dicebear.svg"
            by="FlorianKoerner"
            docs="https://avatars.dicebear.com/"
            desc="Can choose between simple identicons and lovely designed characters."
          />
          
        </StackWrap>
      </section>

    </>
  );
};

export default SystemSpec;
