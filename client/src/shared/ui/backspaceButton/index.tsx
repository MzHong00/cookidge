import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";

import { IconButton } from "../iconButton";

export const BackspaceButton = () => {
  const navigate = useNavigate();

  return (
    <nav style={{width: "100%"}}>
      <IconButton
        Icon={RiArrowLeftSLine}
        style={{ paddingInline: 0, fontSize: "1.5em" }}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      />
    </nav>
  );
};
