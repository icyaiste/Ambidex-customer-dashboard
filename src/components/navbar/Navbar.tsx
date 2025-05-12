import "./NavbarStyle.scss";
import AmbidexLogo from "../../assets/images/green-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../services/AuthService";
import smallLogo from "../../assets/images/small-logo.png";
import languageIcon from "../../assets/images/heroicons_language.svg";
import { useLanguage } from "../../services/LanguageService";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import hamburgerIcon from "../../assets/images/hamburger-menu-white.svg";

function Navbar() {
  const { content, changeLanguage } = useLanguage();

  const handleSignOut = (event: React.MouseEvent) => {
    event.stopPropagation();
    signOut();
  };

  const goHome = () => {
    navigate("/dashboard");
  };

  return (
    <nav>
      <button onClick={goHome} className="logo__large" type="button">
        <img src={AmbidexLogo} className="logo__img" alt="Ambidex Logotyp" />
      </button>
      <img
        src={smallLogo}
        className="logo__small"
        alt="liten Ambidex Logotyp"
      />
      {/*Desktop links*/}
      <section className="links">
        <Link to="/dashboard">{content.navBar_home}</Link>
        <Link to="/history">{content.navBar_history}</Link>
        <Link to="/kontakter">{content.navBar_contacts}</Link>
        {/* Language selection dropdown using DropdownMenu */}
        <DropdownMenu
          classSuffix="language"
          toggleContent={<img src={languageIcon} alt={content.navBar_languageIcon} />}
        >
          <button
            className="language__option"
            onClick={() => {
              changeLanguage("sv");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeLanguage("sv");
              }
            }}
            tabIndex={0}
          >
            Svenska
          </button>
          <button
            className="language__option"
            onClick={() => {
              changeLanguage("eng");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                changeLanguage("eng");
              }
            }}
            tabIndex={0}
          >
            English
          </button>
        </DropdownMenu>
        <button
          className="sign__out"
          onClick={handleSignOut}
          type="button"
          aria-label={content.logout}
        >
          {content.logout}
        </button>
      </section>
      {/*Mobile links*/}
      <section className="mobile__controls">
        <DropdownMenu
          classSuffix="hamburger"
          toggleContent={<img src={hamburgerIcon} alt={content.navBar_hamburgerIcon} />}
        >
          <Link to="/dashboard">{content.navBar_home}</Link>
          <Link to="/history">{content.navBar_history}</Link>
          <Link to="/kontakter">{content.navBar_contacts}</Link>
          <button onClick={handleSignOut}>
            {content.logout}
          </button>
        </DropdownMenu>
      </section>
    </nav>
  );
}

export default Navbar;
