import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Card.module.css';
export function Card({ children, title, action, className }) {
    return (_jsxs("div", { className: `${styles.card} ${className || ''}`, children: [(title || action) && (_jsxs("div", { className: styles.cardHeader, children: [title && _jsx("h2", { className: styles.cardTitle, children: title }), action && (_jsx("button", { className: styles.cardAction, onClick: action.onClick, children: action.label }))] })), _jsx("div", { className: styles.cardContent, children: children })] }));
}
