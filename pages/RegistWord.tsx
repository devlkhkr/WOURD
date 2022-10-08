import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/scss/pages/_RegistWord.module.scss'

const RegistWord: NextPage = () => {
  const [isIntl, setIsIntl] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>

        <div>
          <label htmlFor="wordName">단어명을 입력해주세요.</label>
          <input type="text" placeholder="예) SSR" id="wordName"></input>
        </div>

        <div>
          <h3>약어 인가요?</h3>
          <div>
            <label htmlFor="intlYN_Y">예, 약어입니다.</label>
            <input type="radio" name="wordType" id="intlYN_Y"></input>
            <label htmlFor="intlYN_N">아니요, 악어가 아닙니다.</label>
            <input type="radio" name="wordType" id="intlYN_N"></input>
          </div>
        </div>

        <div>
          <label htmlFor="wordsExpln">약어의 전체 문장을 적어주세요.</label>
          <input type="text" placeholder="예) Server Side Rendering" id="wordsExpln"></input>
        </div>

        <div>
          <label htmlFor="">단어에 대한 설명을 적어주세요.</label>
          <textarea placeholder="SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식입니다."></textarea>
        </div>

        <div>
          <button type="button">취소</button>
          <button type="button">단어 등록하기</button>
        </div>

      </div>

    </div>
  )
}

export default RegistWord
