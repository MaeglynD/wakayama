"use client";
import s from "./page.module.css";

export default function Arrow(customClass = "") {
  return (
    <svg
      className={`${customClass} ${s.arrow}`}
      viewBox="0 0 12 8"
      fill="rgb(30,30,30)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.77659 3.15041C6.73486 2.51192 5.8654 1.59079 5.28007 0.455004L6.17008 0C7.17008 1.94502 9.1501 3.15002 11.3351 3.15002V3.1553L11.34 3.1553V4.15531C9.15498 4.15531 7.17497 5.36531 6.17496 7.30533L5.28495 6.85033C5.86916 5.71187 6.74009 4.78908 7.78507 4.15042H0V3.15041H7.77659Z"
      />
    </svg>
  );
}
