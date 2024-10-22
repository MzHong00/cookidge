import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { IconLink } from "../iconLink";

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export const Logo = ({ style, className }: Props) => {
  return (
    <IconLink
      to={"/"}
      Icon={ImSpoonKnife}
      style={{ fontWeight: "bold", fontSize: "1.5rem", ...style }}
      className={className}
    >
      Cookidge
    </IconLink>
  );
};
