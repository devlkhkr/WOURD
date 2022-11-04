import { StyledInterface } from "styled-components";

interface HelpMessageTypes extends StyledInterface {

}

const HelpMessage: React.FC = () => {

  return (
    <div>
      help modal이염~
      {/* {gitCommitList.map((data: GitCommitListTypes, index: number) => {
        return (
          <CommitInfoStyled key={index} type={data.commit.message}>
            <Typo fontSize="16px" fontWeight="bold" textAlign="left">
              {data.commit.committer.name}
            </Typo>
            <Typo textAlign="left" marginTop="8px">
              {getCommitTitle(data.commit.message)}
            </Typo>
          </CommitInfoStyled>
        );
      })} */}
    </div>
  );
};

export default HelpMessage;
