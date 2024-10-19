import { RiStarFill } from "@react-icons/all-files/ri/RiStarFill";

import { IconButton } from "shared/ui/iconButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  rattingCount: number;
}

export const RattingButton = ({ rattingCount, ...props }: Props) => {
  return (
    <IconButton Icon={() => <RiStarFill color="orange" />} {...props}>
      {rattingCount}
    </IconButton>
  );
};
