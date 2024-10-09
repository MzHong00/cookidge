import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  Icon: IconType;
  title: string;
  subtitle: string;
  headerClassName: string;
}

export const SubjectBox = ({
  Icon,
  title,
  subtitle,
  children,
  headerClassName,
  className,
  ...props
}: Partial<Props>) => {
  return (
    <section className={`${styles.container} ${className}`} {...props}>
      <header>
        <div className={`${headerClassName} ${styles.title}`}>
          {Icon && <Icon className={styles.icon} />}
          {title && <h2>{title}</h2>}
        </div>
        {subtitle && <p className={styles.subTitle}>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
};
