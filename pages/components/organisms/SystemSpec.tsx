import axios from "axios";
import { useState } from "react";
import styled, { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";
import SystemDevsComponent from "../molecules/SystemDevs";

interface SystemSpecTypes extends StyledInterface {

}

const SystemDevsWrap = styled.ul`
  display : flex;
  flex-direction: column;
  align-items : center;
  gap : 16px;
  padding : 0 4px;
  margin-top : 16px;
`

const SystemSpec: React.FC = () => {

  const [ devs, setDevs ] = useState([
    {
      id: 1,
      pos: "Full-Stack Dev",
      name: "Kany Kang",
      github: "devlkhkr",
      mail: "www.naver.com"
    },
    {
      id: 2,
      pos: "Front-end Dev",
      name: "Amazing2bobii",
      github: "chromeheartz",
      mail: "www.naver.com"
    }
  ])

  const getApi = async () => {
    const res = await axios.get("http://localhost:3000" + "/api/word/list");
    console.log(res)
  }

  return (
    <>
      <TypoComponent
        fontSize="18px"
        fontWeight="bold"
        textAlign="left"
        color="#202020"
      >
        Developers
      </TypoComponent>
      <SystemDevsWrap>
        {
          devs.map(dev => (
            <SystemDevsComponent
              key={dev.id}
              pos={dev.pos}
              name={dev.name}
              github={dev.github}
              mail={dev.mail}
            />
          ))
        }
      </SystemDevsWrap>
      <div>
        
      </div>
    </>
  );
};

export default SystemSpec;
