import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiHeart3Fill } from "@react-icons/all-files/ri/RiHeart3Fill";

import { IconButton } from "shared/ui/iconButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  likeCount: number;
}

export const LikeButton = ({ likeCount, isActive, ...props }: Props) => {
  if (isActive)
    return (
      <IconButton Icon={() => <RiHeart3Fill color="red" />} {...props}>
        {likeCount}
      </IconButton>
    );

  return (
    <IconButton Icon={() => <RiHeart3Line color="red" />} {...props}>
      {likeCount}
    </IconButton>
  );
};
