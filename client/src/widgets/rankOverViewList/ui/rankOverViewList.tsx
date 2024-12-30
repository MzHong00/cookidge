import { IconLink } from "shared/ui/iconLink";
import { SubjectBox } from "shared/ui/subjectBox";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  to: string;
  subject: string;
}

export const RankOverViewList = ({
  to,
  subject,
  className,
  children,
  ...props
}: Props) => {
  return (
    <SubjectBox title={subject}>
      <div className={`${className} `} {...props}>
        {children}
        <IconLink to={to} className="main-button" style={{marginTop: "1em"}}>
          더 보기
        </IconLink>
      </div>
    </SubjectBox>
  );
};
