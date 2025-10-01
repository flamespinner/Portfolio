import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeWindow() {
  const fullCode = `
const coder = {
  name: 'Michael Wilke',
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Node.js',
    'SQL Server', 'ETL', 'PowerShell', 'Azure',
    'Python', 'Lua', 'Docker', 'DevOps', 'Web Design'
  ],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function () {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 5
    );
  }
};
`;

  const [displayedCode, setDisplayedCode] = useState("");
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typing effect with random-ish speed
  useEffect(() => {
    if (index < fullCode.length) {
      const delay = Math.random() * (80 - 30) + 30; // random between 30–80ms
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + fullCode[index]);
        setIndex((i) => i + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, fullCode]);

  // Cursor blinking
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500); // blink every half second
    return () => clearInterval(blink);
  }, []);

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        background: "#1e1e1e",
        maxWidth: "100%",
        width: "100%",
      }}
    >
      {/* Title bar with circles */}
      <div
        style={{
          background: "#2d2d2d",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
      </div>

      {/* Syntax-highlighted code */}
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#1e1e1e",
          fontSize: "0.85rem",
          minHeight: "320px",
          height: "425px", // Set static height
          overflowY: "auto", // Allow scrolling if content exceeds height
        }}
      >
        {displayedCode + (cursorVisible && index < fullCode.length ? "|" : "")}
      </SyntaxHighlighter>
    </div>
  );
}

