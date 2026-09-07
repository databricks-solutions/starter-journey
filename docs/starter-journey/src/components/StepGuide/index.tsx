import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export interface StepImageProps {
  src?: string;
  alt?: string;
  placeholder?: string;
}

export function StepImage({ src, alt, placeholder }: StepImageProps) {
  const resolvedSrc = useBaseUrl(src ?? '');

  return (
    <div className={clsx(styles.imageFrame, src && styles.imageFrameFilled)}>
      {src ? (
        <img className={styles.image} src={resolvedSrc} alt={alt ?? placeholder ?? ''} />
      ) : (
        <span className={styles.placeholder}>{placeholder ?? 'Screenshot coming soon'}</span>
      )}
    </div>
  );
}

export interface StepProps {
  children: React.ReactNode;
  /** Injected by StepGuide. Authors do not set these. */
  number?: number;
  isLast?: boolean;
  idPrefix?: string;
}

export function Step({ children, number, isLast, idPrefix = 'step' }: StepProps) {
  const anchor = `${idPrefix}-${number}`;

  return (
    <div id={anchor} className={clsx(styles.step, isLast && styles.stepLast)}>
      <div className={styles.rail}>
        <a href={`#${anchor}`} className={styles.circle} aria-label={`Link to step ${number}`}>
          {number}
        </a>
        {!isLast && <span className={styles.connector} aria-hidden="true" />}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export interface StepGuideProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  minutes?: number;
  eyebrow?: string;
  referenceHref?: string;
  referenceLabel?: string;
  idPrefix?: string;
}

export function StepGuide({
  children,
  title,
  description,
  minutes,
  eyebrow = 'Walkthrough',
  referenceHref,
  referenceLabel,
  idPrefix = 'step',
}: StepGuideProps) {
  const steps = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<StepProps> =>
      React.isValidElement(child) && child.type === Step,
  );

  const eyebrowParts = [
    eyebrow,
    `${steps.length} steps`,
    minutes != null ? `~${minutes} min` : null,
  ].filter(Boolean);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>{eyebrowParts.join(' · ')}</span>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
      </header>

      <div className={styles.steps}>
        {steps.map((step, index) =>
          React.cloneElement(step, {
            key: index,
            number: index + 1,
            isLast: index === steps.length - 1,
            idPrefix,
          }),
        )}
      </div>

      {referenceHref && (
        <p className={styles.reference}>
          Reference: <a href={referenceHref}>{referenceLabel ?? referenceHref}</a>
        </p>
      )}
    </section>
  );
}

export default StepGuide;
