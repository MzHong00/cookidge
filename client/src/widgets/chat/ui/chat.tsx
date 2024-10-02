import { Comment } from "shared/types";
import { IconButton } from "shared/ui/iconButton";

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<Comment> {}

export const Chat = ({
  user_tag_name,
  comment,
  created_at,
  ...props
}: Props) => {
  return (
    <div {...props}>
      <div>
        <IconButton src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c" />
      </div>
      <div>
        <div>
          <h3>name</h3>
          <p>{created_at?.toString()}</p>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};
