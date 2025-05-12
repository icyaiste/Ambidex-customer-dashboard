import hamburgerIcon from "../../assets/images/hamburger-menu-white.svg";
import { useState } from "react";
import { DropdownMenuProps } from "../../interfaces/DashboardInterface";
import "./DropdownStyle.scss";
import { useLanguage } from "../../services/LanguageService";

function DropdownMenu({ toggleContent, children, classSuffix }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useLanguage();

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent click event from affecting other components(dvs trigger signOut onClick)
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`dropdown__container ${classSuffix ? `dropdown__${classSuffix}` : ""}`}>
      <button
        className="dropdown__button"
        onClick={toggleMenu}
        type="button"
        aria-label={content.dropdown_button}
      >
        {toggleContent || (
          <img
            className="hamburger__icon"
            src={hamburgerIcon}
            alt={content.dropdown_button}
          />
        )}
      </button>
      {isOpen && <div className="dropdown__menu">{children}</div>}
    </div>
  );
}

export default DropdownMenu;
