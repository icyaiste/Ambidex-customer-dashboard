import React, { useState } from "react";
import { HoverModalProps } from "../../../interfaces/DashboardInterface";

const HoverModal: React.FC<HoverModalProps> = ({ trigger, modalContent }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="infoWrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {trigger}
      {isHovered && <>{modalContent}</>}
    </div>
  );
};

export default HoverModal;
