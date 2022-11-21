import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import InputText from "../../components/atoms/InputText";
import Radio from "../../components/atoms/Radio";
import Select from "../../components/atoms/Select";
import MultiSelect from "../../components/atoms/MultiSelect";
import Label from "../../components/atoms/Label";
import Textarea from "../../components/atoms/Textarea";
import Button from "../../components/atoms/Button";
import Fieldset from "../../components/molecules/Fieldset";
import InputWrap from "../../components/molecules/InputWrap";
import ButtonWrap from "../../components/molecules/ButtonWrap";
import Form from "../../components/organisms/Form";
import axios from "axios";
import uuid from "uuid4";
interface RegistWordTypes {}

const RegistWordWrap = styled.div``;

const RegistWord: NextPage<RegistWordTypes> = ({}) => {
  const [isIntl, setIsIntl] = useState(true);
  const [wordTit, setwordTit] = useState("");
  const wordIntlFlag: any = useRef();
  const [wordUnravel, setWordUnravel] = useState("");
  const [wordDesc, setwordDesc] = useState("");
  const wordCtgr: any = useRef();
  const onAfterRegState: any = useRef();

  const intlYNOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(wordIntlFlag.current.getValue());
    const target = event.target as HTMLInputElement;
    target.id === "intlYN_0" ? setIsIntl(true) : setIsIntl(false);
  };
  const router = useRouter();
  const cancleRegWordClick = () => {
    router.back();
  };
  const startWordReg = async () => {
    wordTit; // 단어명
    wordIntlFlag.current.getValue(); // 약어 YN
    wordUnravel; // 약어 풀이
    wordDesc; //단어 설명
    wordCtgr.current.getValue(); // 카테고리
    onAfterRegState.current.value; // 등록후 단어관리

    console.log(
      wordTit,
      wordIntlFlag.current.getValue(),
      wordUnravel,
      wordDesc,
      wordCtgr.current.getValue(),
      onAfterRegState.current.value
    );

    const res = await axios.post("http://localhost:3000" + "/api/word/reg", {
      wordRegistData: {
        wordId: uuid().replaceAll("-", ""),
        wordTit: wordTit,
        wordIntlFlag: wordIntlFlag.current.getValue(),
        wordUnravel: wordUnravel,
        wordDesc: wordDesc,
        wordCtgr: wordCtgr.current.getValue(),
        // wordState: onAfterRegState.current.value,
      },
    });

    res.data.affectedRows === 1 ? alert("등록완료") : void 0;
  };
  return (
    <RegistWordWrap>
      <Form>
        <Fieldset>
          <Label
            htmlFor="wordName"
            desc="단어를 입력해주세요."
            mandatory={true}
          />
          <InputText
            type="text"
            placeHolder="예) SSR"
            id="wordName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setwordTit(e.currentTarget.value);
            }}
          />
        </Fieldset>

        <Fieldset>
          <Label desc="약어 인가요?" mandatory={true}></Label>
          <InputWrap>
            <Radio
              name="intlYN"
              onClick={intlYNOnclick}
              reference={wordIntlFlag}
              options={[
                {
                  name: "예, 약어입니다.",
                  value: 0,
                  defaultChecked: true,
                },
                {
                  name: "아니요, 낱말입니다.",
                  value: 1,
                },
              ]}
            />
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
              id="wordsExpln"
              type="text"
              placeHolder="예) Server Side Rendering"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setWordUnravel(e.currentTarget.value);
              }}
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
            height="300px"
            placeholder="예) SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식이다."
            reference={wordDesc}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setwordDesc(e.currentTarget.value);
            }}
          />
        </Fieldset>

        <Fieldset>
          <Label
            htmlFor="wordsCtgrCbx"
            desc="카테고리를 선택해주세요. (중복선택 가능)"
            mandatory={true}
          />
          <MultiSelect
            options={[
              {
                name: "CS",
                value: 0,
              },
              {
                name: "Web",
                value: 1,
              },
              {
                name: "App",
                value: 2,
              },
            ]}
            id="wordsCtgrCbx"
            name="wordsCategoryCbx"
            reference={wordCtgr}
          />
        </Fieldset>

        <Fieldset>
          <Label
            htmlFor="wordsCtgrSlct"
            desc="등록 후 단어 관리"
            mandatory={true}
          />
          <Select
            reference={onAfterRegState}
            options={[
              {
                name: "선택안함",
                value: "",
              },
              {
                name: "아는 단어에 추가",
                value: "k",
              },
              {
                name: "모르는 단어에 추가",
                value: "d",
              },
              {
                name: "즐겨찾은 단어에 추가",
                value: "f",
              },
              {
                name: "건너뛴 단어에 추가",
                value: "s",
              },
            ]}
            id="wordsCtgrSlct"
            name="wordsCategorySlct"
          />
        </Fieldset>

        <Fieldset>
          <ButtonWrap>
            <Button
              desc="취소"
              id="cancleRegWord"
              backgroundColor="#666"
              color="#fff"
              width="40%"
              height="40px"
              onClick={cancleRegWordClick}
            />
            <Button
              desc="단어 등록하기"
              id="submitRegWord"
              backgroundColor="var(--color-point)"
              color="#fff"
              width="60%"
              height="40px"
              onClick={startWordReg}
            />
          </ButtonWrap>
        </Fieldset>
      </Form>
    </RegistWordWrap>
  );
};

export default RegistWord;
