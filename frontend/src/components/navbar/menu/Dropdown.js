import { NavLink } from "react-router-dom";
import { DropdownMenuItems } from "../../data";
import { useState } from "react";
import "./Dropdown.scss"

export default function ServiceDropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {DropdownMenuItems.map((item) => {
          const { _id, title, path, cName } = item;
          return (
            <li key={_id}>
              <NavLink className={cName} to={path} onClick={() => setClick(false)}>
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
