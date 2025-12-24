import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from '../members/MembersPage.module.css';
const mockClasses = [
    { id: 1, name: '매트 필라테스 A', type: '그룹', capacity: 10, level: '초급', instructor: '김강사', status: 'active' },
    { id: 2, name: '기구 필라테스 B', type: '소그룹', capacity: 6, level: '중급', instructor: '이강사', status: 'active' },
    { id: 3, name: '재활 필라테스', type: '개인', capacity: 4, level: '전문', instructor: '박강사', status: 'active' },
    { id: 4, name: '매트 필라테스 B', type: '그룹', capacity: 10, level: '초급', instructor: '김강사', status: 'active' },
    { id: 5, name: '기구 필라테스 A', type: '소그룹', capacity: 6, level: '중급', instructor: '이강사', status: 'inactive' },
];
export function ClassesPage() {
    return (_jsxs("div", { className: styles.container, children: [_jsx(PageHeader, { title: "\uC218\uC5C5", description: "\uC218\uC5C5 \uC720\uD615\uACFC \uC815\uBCF4\uB97C \uAD00\uB9AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", action: {
                    label: '수업 추가',
                    onClick: () => console.log('수업 추가'),
                } }), _jsx(Card, { children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\uC218\uC5C5\uBA85" }), _jsx("th", { children: "\uC720\uD615" }), _jsx("th", { children: "\uC815\uC6D0" }), _jsx("th", { children: "\uB09C\uC774\uB3C4" }), _jsx("th", { children: "\uB2F4\uB2F9 \uAC15\uC0AC" }), _jsx("th", { children: "\uC0C1\uD0DC" }), _jsx("th", {})] }) }), _jsx("tbody", { children: mockClasses.map((item, idx) => (_jsxs("tr", { style: { animationDelay: `${idx * 50}ms` }, children: [_jsx("td", { children: _jsx("strong", { children: item.name }) }), _jsx("td", { children: item.type }), _jsxs("td", { children: [item.capacity, "\uBA85"] }), _jsx("td", { children: item.level }), _jsx("td", { children: item.instructor }), _jsx("td", { children: _jsx("span", { className: `${styles.status} ${styles[item.status]}`, children: item.status === 'active' ? '활성' : '비활성' }) }), _jsx("td", { children: _jsx("button", { className: styles.actionBtn, children: _jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "1" }), _jsx("circle", { cx: "19", cy: "12", r: "1" }), _jsx("circle", { cx: "5", cy: "12", r: "1" })] }) }) })] }, item.id))) })] }) })] }));
}
