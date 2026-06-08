import { motion } from "motion/react";

export const Wave: React.FC<{ children: string }> = ({ children }) => {
  return (
    <span className="inline-flex whitespace-pre">
      {children.split("").map((char, index) => (
        <motion.span
          key={index.toString()}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
