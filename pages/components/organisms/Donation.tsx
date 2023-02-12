import styled from "styled-components";
import ButtonCompontent from "../atoms/Button";
import TypoComponent from "../atoms/Typo";

const DonationStyeld = styled.div`
  > div + div {
    margin-top: 16px;
  }
`;

const Donation: React.FC = () => {
  return (
    <DonationStyeld>
      <TypoComponent fontSize="14px">
        우리는 항상 새로운 지식을 필요로 합니다.
        <br />
        개발 직업군에 종사하고 있는 분들은 더 크게 공감하실 거라 생각합니다.
        <br />
        지식을 습득하는 과정 중 가장 큰 걸림돌은 새로 마주하는 낯선 단어라고
        생각합니다.
        <br />
        그러한 단어들을 카테고리별로 등록하여 저장 및 상태 관리해보세요.
        <br />
        또, 다른 사용자가 등록한 단어들을 살펴보고, 내가 생성한 단어를 공유하여
        모두가 지식의 문을 넓혀가는 것이 이 서비스의 궁극적인 목표입니다.
      </TypoComponent>
      <TypoComponent fontSize="14px">
        현재 저희 서비스의 데이터베이스 서버는 AWS(Amazon Web Services)의
        RDS(Relational Database Service)를 이용하고 있습니다.
      </TypoComponent>
      <TypoComponent fontSize="14px">
        서버 스펙으로는 범용 SSD(gp2), 스토리지 20 GiB, RAM 1GB 이며 MYSQL
        8.0.28 엔진버전을 사용중 입니다.
      </TypoComponent>
      <TypoComponent fontSize="14px">
        도네이션은 매달 서버 사용료 및 서비스 개발에 이용되며 혹, 오버차지 된
        금액은 기부업체 선정 후 연말에 전액 기부될 예정입니다. 여러분의 후원이
        양질의 콘텐츠를 제공하는 데에 큰 힘이 됩니다. 감사합니다.
      </TypoComponent>
      <ButtonCompontent
        marginTop="32px"
        desc="PayPal"
        height="48px"
        backgroundColor="var(--color-point)"
        color="#fff"
        onClick={() => {
          window.open("https://paypal.me/devlkhkr", "_blank");
        }}
      ></ButtonCompontent>
    </DonationStyeld>
  );
};

export default Donation;
