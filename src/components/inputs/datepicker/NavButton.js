import React from "react";

export default function NavButton({ children, callback }) {
  return (
    <button type="button" onClick={callback}>
      {children}
    </button>
  );
}
