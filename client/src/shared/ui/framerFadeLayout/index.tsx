import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {}

export const FramerFadeLayout = ({ children, ...props }: Props) => {
  const variant: Variants = {
    fadeIn: { opacity: 1 },
    fadeOut: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variant}
        initial="fadeOut"
        animate="fadeIn"
        exit="fadeOut"
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
