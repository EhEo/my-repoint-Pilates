import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './PageHeader.module.css';
export function PageHeader({ title, description, action }) {
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.headerContent, children: [_jsx("h1", { className: styles.title, children: title }), description && _jsx("p", { className: styles.description, children: description })] }), action && (_jsxs("button", { className: styles.action, onClick: action.onClick, children: [action.icon || (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] })), action.label] }))] }));
}
