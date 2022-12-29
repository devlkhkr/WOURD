import React from "react";

interface MailType {
  name?: string;
  children?: any;
  addr: string;
}

const Mailto: React.FC<MailType> = ({ name, children, addr }) => {
  return (
    <a href={`mailto:${addr}?subject=Hello developer ${name}`} style={{color: 'inherit'}}>
      {children}
    </a>
  );
};

export default Mailto;
