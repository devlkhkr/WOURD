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
import { useSession } from "next-auth/react";
import { newAlert } from "pages/components/atoms/Alert";

interface ModifyWordTypes {
  wordData: {
    word_seq: number;
    word_id: string;
    word_name: string;
    word_intl_flag: boolean;
    word_unravel: string;
    word_desc: string;
    word_reg_userid: string;
    word_reg_date: string | Date;
    word_use_flag: boolean;
    word_is_cs_flag: boolean;
    word_is_web_flag: boolean;
    word_is_ntv_flag: boolean;
  }[];
}

const RegistWordWrap = styled.div``;

const ModifyWord: NextPage<ModifyWordTypes> = ({
  wordData,
}: ModifyWordTypes) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isIntl, setIsIntl] = useState(wordData[0].word_intl_flag);
  const [wordTit, setWordTit] = useState(wordData[0].word_name);
  const wordIntlFlag: any = useRef(wordData[0].word_intl_flag);
  const [wordUnravel, setWordUnravel] = useState(wordData[0].word_unravel);
  const [wordDesc, setWordDesc] = useState(wordData[0].word_desc);
  const wordCtgr: any = useRef();

  /* FIXME 배포 시 undefined 가능성 오류로 임시 주석처리 */
  useEffect(() => {
    if (session) {
      wordData[0].word_reg_userid != session.user.email!
        ? (() => {
            router.back();
            newAlert("권한이 없습니다.", "ngtv");
          })()
        : void 0;
    }
  }, [wordData]);

  const intlYNOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWordUnravel("");
    const target = event.target as HTMLInputElement;
    target.id === "intlYN_1" ? setIsIntl(true) : setIsIntl(false);
  };
  const cancleRegWordClick = () => {
    router.back();
  };
  const startWordMod = async () => {
    console.log("작성된 단어명: ", wordTit);
    console.log("선택된 약어 Y/N: ", wordIntlFlag.current.getValue());
    console.log("작성된 약어 풀이: ", wordUnravel);
    console.log("작성된 단어 설명: ", wordDesc);
    console.log("선택된 단어 카테고리: ", wordCtgr.current.getValue());
    console.log("-----------------------------");

    if (wordTit.length <= 0) {
      alert("단어명을 입력하세요.");
      return;
    } else if (
      wordIntlFlag.current.getValue() === "1" &&
      wordUnravel.length <= 0
    ) {
      alert("약어를 각각의 낱말로 풀어서 적어주세요.");
      return;
    } else if (wordDesc.length <= 0) {
      alert("단어 설명을 입력해주세요.");
      return;
    } else if (wordCtgr.current.getValue().indexOf("1") === -1) {
      alert("단어의 카테고리를 선택해주세요.");
      return;
    } else {
      // S : 단어 Insert 로직
      const wordRegistData = {
        userId: session ? session.user.email : "",
        wordId: wordData[0].word_id,
        wordTit: wordTit.replaceAll("'", "''"),
        wordIntlFlag: wordIntlFlag.current.getValue(),
        wordUnravel:
          wordUnravel === null ? "" : wordUnravel.replaceAll("'", "''"),
        wordDesc: wordDesc.replaceAll("'", "''"),
        wordCtgr: wordCtgr.current.getValue(),
      };
      const resReg = await axios.post(
        process.env.NEXT_PUBLIC_ORIGIN + "/api/word/mod",
        {
          wordRegistData: wordRegistData,
        }
      );

      if (resReg.data.affectedRows === 1) {
        router.back();
        newAlert("단어 수정완료", "pstv");
      }
      // E : 단어 Insert 로직
    }
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
            defaultValue={wordTit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setWordTit(e.currentTarget.value);
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
              defaultChecked={wordData[0].word_intl_flag ? 1 : 0}
              options={[
                {
                  name: "아니요, 낱말입니다.",
                  value: 0,
                },
                {
                  name: "예, 약어입니다.",
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
              defaultValue={wordUnravel}
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
            defaultValue={wordDesc}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setWordDesc(e.currentTarget.value);
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
                defaultChecked: wordData[0].word_is_cs_flag,
              },
              {
                name: "Web",
                value: 1,
                defaultChecked: wordData[0].word_is_web_flag,
              },
              {
                name: "Native",
                value: 2,
                defaultChecked: wordData[0].word_is_ntv_flag,
              },
            ]}
            id="wordsCtgrCbx"
            name="wordsCategoryCbx"
            reference={wordCtgr}
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
              desc="단어 수정하기"
              id="submitRegWord"
              backgroundColor="var(--color-point)"
              color="#fff"
              width="60%"
              height="40px"
              onClick={startWordMod}
            />
          </ButtonWrap>
        </Fieldset>
      </Form>
    </RegistWordWrap>
  );
};

export const getServerSideProps = async (context: any) => {
  let wordId = context.query.pid[0];
  const res = await axios.get(
    process.env.NEXT_PUBLIC_ORIGIN + "/api/myword/info",
    {
      headers: { "Content-type": "application/json" },
      params: {
        wordId: wordId,
      },
    }
  );
  console.log(res.data);
  return {
    props: {
      wordData: res.data,
    },
  };
};

export default ModifyWord;
