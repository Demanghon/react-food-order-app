import React from "react";
import HeaderCartButton from "../Cart/HeaderCartButton";
import style from './Header.module.css';
import meals from "./meals.jpg";

const Header = () => {
    return (
      <>
        <header className={style.header}>
          <h1>ReactMeals</h1>
          <HeaderCartButton />
        </header>
        <div className={style["main-image"]}>
          <img src={meals} alt="meals"></img>
        </div>
      </>
    );
}

export default Header;