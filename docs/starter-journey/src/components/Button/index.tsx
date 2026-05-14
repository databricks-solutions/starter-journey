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
      style={{
        display: 'inline-block',
        padding: '0.5rem 1.25rem',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '0.95rem',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        backgroundColor: 'var(--ifm-color-primary)',
        color: '#ffffff',
        border: 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
      }}
    >
      {label}
    </a>
  );
}
