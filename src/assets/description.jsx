import { useState } from "react";

const Description = ({ text, className }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const lines = text.split('\n');

  return (
    <div className={className}>
      {(expanded ? lines : lines.slice(0, 2)).map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
      {lines.length > 2 && (
        <button onClick={toggleExpand} className="description-toggle-btn">
          {expanded ? "Ver menos ▲" : "Ver más ▼"}
        </button>
      )}
    </div>
  );
};

export default Description;