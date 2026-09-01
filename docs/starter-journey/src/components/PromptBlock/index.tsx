import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

export interface PromptBlockProps {
  children: React.ReactNode;
  label?: string;
}

function SparkleIcon() {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 8.75v-.744c0-.97.786-1.756 1.756-1.756h1.1c.372 0 .712.21.878.543l.595 1.188a4.104 4.104 0 0 0 7.342 0l.595-1.188.069-.12a.98.98 0 0 1 .809-.423H16v1.5h-2.536l-.451.902a5.604 5.604 0 0 1-10.026 0l-.45-.902h-.781a.256.256 0 0 0-.256.256v.744a.5.5 0 0 0 .5.5v1.5a2 2 0 0 1-2-2m10.5 4v1.5h-5v-1.5zM8 1.75a.75.75 0 0 1 .74.621l.226 1.303a.75.75 0 0 0 .61.61l1.303.227a.75.75 0 0 1 0 1.478l-1.303.227a.75.75 0 0 0-.61.61L8.739 8.13a.75.75 0 0 1-1.478 0l-.227-1.303a.75.75 0 0 0-.61-.61L5.12 5.989a.75.75 0 0 1 0-1.478l1.303-.227a.75.75 0 0 0 .61-.61l.227-1.303.035-.13A.75.75 0 0 1 8 1.75" />
    </svg>
  );
}

export default function PromptBlock({ children, label = 'Prompt' }: PromptBlockProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = textRef.current?.textContent ?? '';
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.root}>
      <span className={styles.accent} aria-hidden="true" />
      <div className={styles.head}>
        <span className={styles.label}>
          <SparkleIcon />
          {label}
        </span>
        <button type="button" className={styles.copy} onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p ref={textRef} className={styles.text}>
        {children}
      </p>
    </div>
  );
}
