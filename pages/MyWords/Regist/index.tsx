import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import Form from "../../components/organisms/Form";
import Fieldset from "../../components/molecules/Fieldset";
import InputWrap from "../../components/molecules/InputWrap";
import InputText from "../../components/atoms/InputText";
import Radio from "../../components/atoms/Radio";
import Select from "../../components/atoms/Select";
import MultiSelect from "../../components/atoms/MultiSelect";
import Label from "../../components/atoms/Label";
import Textarea from "../../components/atoms/Textarea";
import Button from "../../components/atoms/Button";

interface RegistWordTypes {}

const RegistWordWrap = styled.div``;

const RegistWord: NextPage<RegistWordTypes> = ({}) => {
  const [isIntl, setIsIntl] = useState(true);
  const intlYNOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLInputElement;
    target.id === "intlYN_Y" ? setIsIntl(true) : setIsIntl(false);
  };
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
              <Radio
                name="intlYN"
                id="intlYN_Y"
                onClick={intlYNOnclick}
                defaultChecked={true}
              />
              <Label htmlFor="intlYN_Y" desc="예, 약어입니다." />
            </InputWrap>
            <InputWrap>
              <Radio name="intlYN" id="intlYN_N" onClick={intlYNOnclick} />
              <Label htmlFor="intlYN_N" desc="아니요, 낱말입니다." />
            </InputWrap>
          </Fieldset>

          {/* S : 약어일때만 조건부 렌더링 */}
          {isIntl ? (
            <Fieldset>
              <Label
                htmlFor="wordsExpln"
                desc="약어를 각각의 낱말로 풀어서 적어주세요."
                mandatory={true}
              />
              <InputText
                placeHolder="예) Server Side Rendering"
                id="wordsExpln"
              />
            </Fieldset>
          ) : (
            <></>
          )}
          {/* E : 약어일때만 조건부 렌더링 */}

          <Fieldset>
            <Label htmlFor="wordDesc" desc="단어에 대한 설명을 적어주세요." />
            <Textarea
              id="wordDesc"
              height={300}
              placeholder="SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식입니다."
            />
          </Fieldset>

          <Fieldset>
            <Label
              htmlFor="wordsCtgrSlct"
              desc="카테고리를 선택해주세요."
              mandatory={true}
            />
            <Select
              options={[
                {
                  name: "CS",
                  value: 0,
                },
                {
                  name: "FrontEnd",
                  value: 1,
                },
                {
                  name: "BackEnd",
                  value: 2,
                },
                {
                  name: "App",
                  value: 3,
                },
              ]}
              id="wordsCtgrSlct"
              name="wordsCategorySlct"
            />
          </Fieldset>

          <Fieldset>
            <Label
              htmlFor="wordsCtgrCbx"
              desc="카테고리를 선택해주세요."
              mandatory={true}
            />
            <MultiSelect
              options={[
                {
                  name: "CS",
                  value: 0,
                },
                {
                  name: "FrontEnd",
                  value: 1,
                },
                {
                  name: "BackEnd",
                  value: 2,
                },
                {
                  name: "App",
                  value: 3,
                },
              ]}
              id="wordsCtgrCbx"
              name="wordsCategoryCbx"
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
