import Button from "./common/Button";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const ExpandableText = ({ children, className }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  const textContent = typeof children === 'string' ? children : '';

  if (textContent.length <= limit) return <p className={`text-lg ${className}`}>{textContent}</p>;

  const summary = expanded ? textContent : textContent.substring(0, limit) + "...";

  return (
    <p className="text-lg">
      {summary}
      <Button
        size="xs"
        color="yellow-400"
        className={`ml-1 font-bold bg-yellow-400 ${className}`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </p>
  );
};

export default ExpandableText;
