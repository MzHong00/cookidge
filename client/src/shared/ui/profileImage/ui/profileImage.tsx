import styles from './profileImage.module.css'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const ProfileImage = ({ className, alt = "", ...props }: Props) => {
  return <img className={`${styles.profile} ${className}`} alt={alt} {...props} />;
};
