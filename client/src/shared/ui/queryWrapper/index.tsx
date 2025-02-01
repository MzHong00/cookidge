import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine";

import { LoadingSpinner } from "../loadingSpinner";
import { IconButton } from "../iconButton";

import styles from "./index.module.scss";

interface Props {
  children: React.ReactNode;
  supenseFallback?: React.ReactNode;
  errorFallback?: (props: FallbackProps) => React.ReactNode;
}

export const QueryWrapper = ({
  children,
  supenseFallback = <LoadingSpinner />,
  errorFallback
}: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={errorFallback ?? ErrorFallback}>
          <Suspense fallback={supenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div className={styles.container}>
    <RiErrorWarningLine className={styles.warning} />
    잠시 후 다시 시도해주세요.
    <IconButton Icon={IoReload} onClick={() => resetErrorBoundary()}>
      다시 시도
    </IconButton>
  </div>
);
