import styles from "./profileImageSkeleton.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfileImageSkeleton = ({ className, ...props }: Props) => {
  return <div className={`${styles.container} ${className}`} {...props} />;
};
