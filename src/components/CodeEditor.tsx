import React, { useState, useEffect, useRef } from 'react';
import './CodeEditor.scss'; // Import the SCSS file
import { Button } from '@mui/material';
import CodeScript from '~/app/constants/CodeScript';

const TextareaWithLineNumbers: React.FC = () => {
  const [text, setText] = useState<string>(CodeScript);
  const [lines, setLines] = useState<number[]>([1]); // Initialize with one line
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumberRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const numberOfLines = text.split('\n').length;
    const lineNumbers = Array.from({ length: numberOfLines }, (_, i) => i + 1);
    setLines(lineNumbers);
  }, [text]);

  const handleScroll = () => {
    if (lineNumberRef.current && textareaRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="container">
      <div className="box1">
        <div ref={lineNumberRef} className="line-numbers">
          {lines.map((line) => (
            <div key={line}>{line + "."}</div>
          ))}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={text}

        onChange={(e) => setText(e.target.value)}
        onScroll={handleScroll}
        className="textarea"

      />
      <div className="small-box">
        <Button
          id='copy-snippet-btn'
          variant="contained"
          color="primary"
          className="copy-snippet-btn"
          sx={{ textTransform: 'none' }}
          onClick={() => {navigator.clipboard.writeText(text)}}
        >
          Copy Snippet
        </Button>

      </div>

    </div>
  );
};

export default TextareaWithLineNumbers;
