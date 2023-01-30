import { paramsAbleKeyTypes } from "../organisms/Context";
import { newAlert } from "./Alert";

export function cardEditOnclick(params:paramsAbleKeyTypes) {
  console.log("edit word, params:::", params);
}

export function cardDelOnclick(params:paramsAbleKeyTypes) {
  confirm("단어를 정말 삭제하시겠습니까?") ? (async() => {
    const res = await fetch("http://localhost:3000" + "/api/word/del", {
      method: 'POST',
      body: JSON.stringify({
        wordOwnerId: params.wordOwnerId,
        wordId: params.wordId,
      })
    });
    res.status === 200 ? newAlert("삭제완료", "pstv") : newAlert("삭제실패", "ngtv")
  })() : void(0)
}
