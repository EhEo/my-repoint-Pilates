import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function Card({ children, title, action, className }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {(title || action) && (
        <div className={styles.cardHeader}>
          {title && <h2 className={styles.cardTitle}>{title}</h2>}
          {action && (
            <button className={styles.cardAction} onClick={action.onClick}>
              {action.label}
            </button>
          )}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
