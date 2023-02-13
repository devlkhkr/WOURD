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
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ORIGIN + "/api/word/list"
    );
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
          {devs.map((dev) => (
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
            name="Dicebear-avatar"
            src="spec-dicebear.svg"
            by="FlorianKoerner"
            docs="https://avatars.dicebear.com/"
            desc="Can choose between simple identicons and lovely designed characters."
          />
        </StackWrap>
      </section>

      {/* dev */}
      <section className="dev-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          Dev
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="ES-Lint"
            src="spec-eslint.png"
            by="Nicholas C. Zakas"
            docs="https://github.com/eslint/eslint"
            desc="ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code."
          />
          <StackComponent
            name="Prettier"
            src="spec-prettier.png"
            by="open source"
            docs="https://prettier.io/"
            desc="Prettier is an opinionated code formatter with support"
          />
          <StackComponent
            name="Babel"
            src="spec-babel.png"
            by="Babel"
            docs="https://babeljs.io/"
            desc="Babel is a JavaScript compiler."
          />
        </StackWrap>
      </section>

      {/* database */}
      <section className="dev-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          Database
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Rds"
            src="spec-rds.png"
            by="AWS.amazon"
            docs="https://aws.amazon.com/ko/rds/"
            desc="Set up, operate, and scale your relational database in the cloud with just a few clicks."
          />
          <StackComponent
            name="Axios"
            src="spec-axios.png"
            by="open source"
            docs="https://axios-http.com/kr/docs/intro"
            desc="Promise-based HTTP client library available in browser and node.js"
          />
          <StackComponent
            name="Rest API"
            src="spec-restapi.png"
            by="Roy Fielding"
            docs="https://aws.amazon.com/ko/what-is/restful-api/"
            desc="an application programming interface (API or web API) that conforms to the constraints of REST architectural style and allows for interaction with RESTful web services"
          />
        </StackWrap>
      </section>

      {/* release */}
      <section className="dev-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          Release
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="Ec2"
            src="spec-ec2.png"
            by="AWS.amazon"
            docs="https://aws.amazon.com/ko/ec2/?trk=68913a17-4967-41f6-a766-0f2eb338dd04&sc_channel=ps&s_kwcid=AL!4422!3!588924203178!p!!g!!ec2&ef_id=CjwKCAiAoL6eBhA3EiwAXDom5q4Z-nFYnywcaXRQysXbQt_VbfQKfIK0vaXJN1Mf3hCce6DdAPG-6hoCpxQQAvD_BwE:G:s&s_kwcid=AL!4422!3!588924203178!p!!g!!ec2"
            desc="Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud."
          />
          <StackComponent
            name="Vercel"
            src="spec-vercel.png"
            by="Vercel"
            docs="https://vercel.com/"
            desc="Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration."
          />
        </StackWrap>
      </section>

      {/* storage */}
      <section className="dev-section">
        <TypoComponent
          fontSize="18px"
          fontWeight="bold"
          textAlign="left"
          color="#202020"
          marginTop="32px"
          marginBottom="16px"
          paddingLeft="4px"
        >
          Storage
        </TypoComponent>
        <StackWrap>
          <StackComponent
            name="S3"
            src="spec-s3.png"
            by="AWS.amazon"
            docs="https://aws.amazon.com/ko/s3/?trk=024bf255-8753-410e-9b2f-8015932510e8&sc_channel=ps&s_kwcid=AL!4422!3!588924203916!e!!g!!s3&ef_id=CjwKCAiAoL6eBhA3EiwAXDom5psEUb4bpRmSvbwFv34jqXBeWX0Qs5K_jgPn-UdikbHJYEXC0m609hoCPCYQAvD_BwE:G:s&s_kwcid=AL!4422!3!588924203916!e!!g!!s3"
            desc="Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance."
          />
        </StackWrap>
      </section>
    </>
  );
};

export default SystemSpec;
