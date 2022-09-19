
import { NavBar } from "./NavBar"
import Styles from "./Header.module.scss"
import logo from "../../Assets/Images/Logo.png"

export const Header = () => {
    return (
      <header className={Styles.headerContainer}>
        <img src={logo} alt="logo" />
        <NavBar />
        <div className="searchFloater">

        </div>
      </header>
    )
}
