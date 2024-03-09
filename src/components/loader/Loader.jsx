import React from "react";
import style from "./loader.module.css";

export default function Loader() {
  return (
    <>
      <div className={style.loaderr}>
        <span className={style.loader} />
      </div>
    </>
  );
}
