import React, { useState, useEffect } from "react";

interface timerTypes {
  mm: string;
  ss: string;
  stopTimer: boolean;
  onExpire: Function;
}

const Timer = ({ mm, ss, stopTimer, onExpire }:timerTypes) => {
  const [minutes, setMinutes] = useState(parseInt(mm));
  const [seconds, setSeconds] = useState(parseInt(ss));
  
  useEffect(() => {
    const countdown = setInterval(() => {
      if(stopTimer){ //인증 성공시
        clearInterval(countdown);
      }
      else{
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(countdown);
              onExpire();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </>
  );
};

export default Timer;