import React, { CSSProperties } from 'react';

interface ButtonProps {
  label: string;
  link: string;
  style?: CSSProperties;
  newTab?: boolean;
}

export default function Button({
  label,
  link,
  style,
  newTab = true,
}: ButtonProps): JSX.Element {
  return (
    <a
      href={link}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="button button--primary button--lg"
      style={style}
    >
      {label}
    </a>
  );
}
