import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from './InstructorsPage.module.css';
const mockInstructors = [
    { id: 1, name: '김강사', specialty: '매트 필라테스', phone: '010-1111-2222', email: 'kim@studio.com', status: 'active', classes: 24 },
    { id: 2, name: '이강사', specialty: '기구 필라테스', phone: '010-2222-3333', email: 'lee@studio.com', status: 'active', classes: 18 },
    { id: 3, name: '박강사', specialty: '재활 필라테스', phone: '010-3333-4444', email: 'park@studio.com', status: 'active', classes: 12 },
    { id: 4, name: '최강사', specialty: '매트 필라테스', phone: '010-4444-5555', email: 'choi@studio.com', status: 'active', classes: 20 },
];
export function InstructorsPage() {
    return (_jsxs("div", { className: styles.container, children: [_jsx(PageHeader, { title: "\uAC15\uC0AC", description: "\uAC15\uC0AC \uC815\uBCF4\uB97C \uAD00\uB9AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", action: {
                    label: '강사 등록',
                    onClick: () => console.log('강사 등록'),
                } }), _jsx("div", { className: styles.grid, children: mockInstructors.map((instructor, idx) => (_jsx(Card, { children: _jsxs("div", { className: styles.instructorCard, style: { animationDelay: `${idx * 100}ms` }, children: [_jsx("div", { className: styles.avatar, children: instructor.name.charAt(0) }), _jsxs("div", { className: styles.info, children: [_jsx("h3", { className: styles.name, children: instructor.name }), _jsx("p", { className: styles.specialty, children: instructor.specialty }), _jsxs("div", { className: styles.contact, children: [_jsx("span", { children: instructor.phone }), _jsx("span", { children: instructor.email })] })] }), _jsx("div", { className: styles.stats, children: _jsxs("div", { className: styles.stat, children: [_jsx("span", { className: styles.statValue, children: instructor.classes }), _jsx("span", { className: styles.statLabel, children: "\uC774\uBC88 \uB2EC \uC218\uC5C5" })] }) }), _jsx("span", { className: `${styles.status} ${styles[instructor.status]}`, children: instructor.status === 'active' ? '활성' : '비활성' })] }) }, instructor.id))) })] }));
}
