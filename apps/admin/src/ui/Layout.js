import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Layout.module.css';
const navItems = [
    {
        path: '/dashboard',
        label: '대시보드',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }), _jsx("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }), _jsx("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }), _jsx("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })] })),
    },
    {
        path: '/members',
        label: '회원',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
    },
    {
        path: '/memberships',
        label: '회원권',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "1", y: "4", width: "22", height: "16", rx: "2" }), _jsx("line", { x1: "1", y1: "10", x2: "23", y2: "10" })] })),
    },
    {
        path: '/classes',
        label: '수업',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), _jsx("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })] })),
    },
    {
        path: '/schedules',
        label: '스케줄',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), _jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), _jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), _jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] })),
    },
    {
        path: '/reservations',
        label: '예약',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), _jsx("polyline", { points: "22 4 12 14.01 9 11.01" })] })),
    },
    {
        path: '/instructors',
        label: '강사',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] })),
    },
    {
        path: '/assessments',
        label: '신체평가',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), _jsx("polyline", { points: "14 2 14 8 20 8" }), _jsx("line", { x1: "16", y1: "13", x2: "8", y2: "13" }), _jsx("line", { x1: "16", y1: "17", x2: "8", y2: "17" }), _jsx("polyline", { points: "10 9 9 9 8 9" })] })),
    },
    {
        path: '/prescriptions',
        label: '운동처방',
        icon: (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) })),
    },
];
export function Layout({ children }) {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    function handleLogout() {
        localStorage.removeItem('repoint_access_token');
        navigate('/login');
    }
    return (_jsxs("div", { className: styles.layout, children: [_jsxs("aside", { className: `${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`, children: [_jsxs("div", { className: styles.brand, children: [_jsx("div", { className: styles.logoMark, children: _jsxs("svg", { viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "20", cy: "20", r: "18", stroke: "currentColor", strokeWidth: "2" }), _jsx("path", { d: "M12 20C12 15.5817 15.5817 12 20 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), _jsx("path", { d: "M28 20C28 24.4183 24.4183 28 20 28", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), _jsx("circle", { cx: "20", cy: "20", r: "4", fill: "currentColor" })] }) }), !isCollapsed && (_jsxs("div", { className: styles.brandText, children: [_jsx("span", { className: styles.brandName, children: "RePoint" }), _jsx("span", { className: styles.brandTagline, children: "Admin" })] }))] }), _jsx("nav", { className: styles.nav, children: navItems.map((item, index) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`, style: { animationDelay: `${index * 50}ms` }, title: isCollapsed ? item.label : undefined, children: [_jsx("span", { className: styles.navIcon, children: item.icon }), !isCollapsed && _jsx("span", { className: styles.navLabel, children: item.label })] }, item.path))) }), _jsxs("div", { className: styles.sidebarBottom, children: [_jsx("button", { className: styles.collapseBtn, onClick: () => setIsCollapsed(!isCollapsed), title: isCollapsed ? '메뉴 펼치기' : '메뉴 접기', children: _jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: isCollapsed ? (_jsx("polyline", { points: "9 18 15 12 9 6" })) : (_jsx("polyline", { points: "15 18 9 12 15 6" })) }) }), _jsxs("button", { className: styles.logoutBtn, onClick: handleLogout, title: "\uB85C\uADF8\uC544\uC6C3", children: [_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), _jsx("polyline", { points: "16 17 21 12 16 7" }), _jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })] }), !isCollapsed && _jsx("span", { children: "\uB85C\uADF8\uC544\uC6C3" })] })] })] }), _jsx("main", { className: styles.main, children: _jsx("div", { className: styles.content, children: children }) })] }));
}
