import { motion } from "motion/react";

export const Wave: React.FC<{ children: string }> = ({ children }) => {
  return (
    <span className="inline-flex whitespace-pre">
      {children.split("").map((char, index) => (
        <motion.span
          key={index.toString()}
          initial={{ y: 0 }}
          animate={{ y: [0, -7, 0] }}
          transition={{
            duration: 0.4,
            delay: index * 0.025,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};
