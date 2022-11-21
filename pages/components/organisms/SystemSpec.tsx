import { StyledInterface } from "styled-components";
import TypoComponent from "../atoms/Typo";

interface SystemSpecTypes extends StyledInterface {

}

const SystemSpec: React.FC = () => {

  return (
    <>
      <TypoComponent
        fontSize="18px"
        fontWeight="medium"
        textAlign="left"
        color="#202020"
      >
        Developers
      </TypoComponent>
    </>
  );
};

export default SystemSpec;
