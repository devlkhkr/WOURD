import type { NextPage } from "next";
import { useEffect, useState } from "react";

const MyWordsComponent: NextPage = () => {
  const [info, setInfo] = useState(Array<any>);
  function test() {
    fetch("http://localhost:3000/api/test", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parm1: "123",
        parm2: "abc",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      });
  }
  useEffect(() => {
    test();
  }, []);
  return (
    <div>
      {info.map((i, index) => (
        <div key={index}>{i.user_id}</div>
      ))}
    </div>
  );
};

export default MyWordsComponent;
