import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  Icon: IconType;
  title: string;
  subtitle: string;
  indicator: string | number;
  headerClassName: string;
}

export const SubjectBox = ({
  Icon,
  title,
  subtitle,
  indicator,
  children,
  headerClassName,
  className,
  ...props
}: Partial<Props>) => {
  return (
    <section className={`${styles.container} ${className}`} {...props}>
      <header>
        <div>
          <div className={`${styles.header} ${headerClassName}`}>
            {Icon && <Icon />}
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
          {indicator && <div className={styles.indicator}>{indicator}</div>}
        </div>
        {subtitle && <p className={styles.subTitle}>{subtitle}</p>}
      </header>
      {children}
    </section>
  );
};
