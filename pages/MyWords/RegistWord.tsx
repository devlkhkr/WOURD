import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import Form from "../components/organisms/Form";
import Fieldset from "../components/molecules/Fieldset";
import InputWrap from "../components/molecules/InputWrap";
import InputText from "../components/atoms/InputText";
import InputRadio from "../components/atoms/InputRadio";
import Label from "../components/atoms/Label";
import Textarea from "../components/atoms/Textarea";
import Button from "../components/atoms/Button";

interface RegistWordTypes {}

const RegistWordWrap = styled.div``;

const RegistWord: NextPage<RegistWordTypes> = ({}) => {
  const [isIntl, setIsIntl] = useState(true);
  return (
    <>
      <RegistWordWrap>
        <Form>
          <Fieldset>
            <Label
              htmlFor="wordName"
              desc="단어를 입력해주세요."
              mandatory={true}
            />
            <InputText placeHolder="예) SSR" id="wordName" />
          </Fieldset>

          <Fieldset>
            <Label desc="약어 인가요?" mandatory={true}></Label>
            <InputWrap>
              <InputRadio name="intlYN" id="intlYN_Y" />
              <Label htmlFor="intlYN_Y" desc="예, 약어입니다." />
            </InputWrap>
            <InputWrap>
              <InputRadio name="intlYN" id="intlYN_N" />
              <Label htmlFor="intlYN_N" desc="아니요, 악어가 아닙니다." />
            </InputWrap>
          </Fieldset>

          <Fieldset>
            <Label
              htmlFor="wordsExpln"
              desc="약어의 전체 문장을 적어주세요."
              mandatory={true}
            />
            <InputText
              placeHolder="예) Server Side Rendering"
              id="wordsExpln"
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="wordDesc" desc="단어에 대한 설명을 적어주세요." />
            <Textarea
              id="wordDesc"
              height={300}
              placeholder="SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식입니다."
            />
          </Fieldset>

          <Fieldset>
            <Button desc="취소" id="cancleRegWord"></Button>
            <Button desc="단어 등록하기" id="submitRegWord"></Button>
          </Fieldset>
        </Form>
      </RegistWordWrap>
    </>
  );
};

export default RegistWord;
