import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from '../members/MembersPage.module.css';
const mockMemberships = [
    { id: 1, name: '6개월 무제한', price: 1800000, duration: 180, sessions: '무제한', status: 'active' },
    { id: 2, name: '3개월 주2회', price: 750000, duration: 90, sessions: '24회', status: 'active' },
    { id: 3, name: '1개월 체험', price: 200000, duration: 30, sessions: '8회', status: 'active' },
    { id: 4, name: '12개월 무제한', price: 3200000, duration: 365, sessions: '무제한', status: 'active' },
    { id: 5, name: '6개월 주3회', price: 1350000, duration: 180, sessions: '72회', status: 'inactive' },
];
export function MembershipsPage() {
    return (_jsxs("div", { className: styles.container, children: [_jsx(PageHeader, { title: "\uD68C\uC6D0\uAD8C", description: "\uD68C\uC6D0\uAD8C \uC0C1\uD488\uC744 \uAD00\uB9AC\uD558\uACE0 \uC124\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", action: {
                    label: '회원권 추가',
                    onClick: () => console.log('회원권 추가'),
                } }), _jsx(Card, { children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\uD68C\uC6D0\uAD8C\uBA85" }), _jsx("th", { children: "\uAC00\uACA9" }), _jsx("th", { children: "\uAE30\uAC04" }), _jsx("th", { children: "\uD69F\uC218" }), _jsx("th", { children: "\uC0C1\uD0DC" }), _jsx("th", {})] }) }), _jsx("tbody", { children: mockMemberships.map((item, idx) => (_jsxs("tr", { style: { animationDelay: `${idx * 50}ms` }, children: [_jsx("td", { children: _jsx("strong", { children: item.name }) }), _jsxs("td", { children: [item.price.toLocaleString(), "\uC6D0"] }), _jsxs("td", { children: [item.duration, "\uC77C"] }), _jsx("td", { children: item.sessions }), _jsx("td", { children: _jsx("span", { className: `${styles.status} ${styles[item.status]}`, children: item.status === 'active' ? '활성' : '비활성' }) }), _jsx("td", { children: _jsx("button", { className: styles.actionBtn, children: _jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "1" }), _jsx("circle", { cx: "19", cy: "12", r: "1" }), _jsx("circle", { cx: "5", cy: "12", r: "1" })] }) }) })] }, item.id))) })] }) })] }));
}
