import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './DashboardPage.module.css';
const stats = [
    {
        label: '오늘 예약',
        value: 24,
        change: '+12%',
        trend: 'up',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), _jsx("polyline", { points: "22 4 12 14.01 9 11.01" })] })),
    },
    {
        label: '활성 회원',
        value: 156,
        change: '+5%',
        trend: 'up',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
    },
    {
        label: '이번 달 수업',
        value: 89,
        change: '-3%',
        trend: 'down',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), _jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), _jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), _jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })] })),
    },
    {
        label: '예약률',
        value: '78%',
        change: '+8%',
        trend: 'up',
        icon: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "12", y1: "20", x2: "12", y2: "10" }), _jsx("line", { x1: "18", y1: "20", x2: "18", y2: "4" }), _jsx("line", { x1: "6", y1: "20", x2: "6", y2: "16" })] })),
    },
];
const recentReservations = [
    { id: 1, member: '김지영', cls: '매트 필라테스', time: '10:00', status: 'confirmed' },
    { id: 2, member: '이수민', cls: '기구 필라테스', time: '11:00', status: 'confirmed' },
    { id: 3, member: '박현우', cls: '재활 필라테스', time: '14:00', status: 'pending' },
    { id: 4, member: '최민지', cls: '매트 필라테스', time: '15:00', status: 'confirmed' },
    { id: 5, member: '정다은', cls: '기구 필라테스', time: '16:00', status: 'cancelled' },
];
const todaySchedule = [
    { time: '09:00', cls: '매트 필라테스 A', instructor: '김강사', capacity: '8/10' },
    { time: '10:00', cls: '기구 필라테스 B', instructor: '이강사', capacity: '4/6' },
    { time: '11:00', cls: '재활 필라테스', instructor: '박강사', capacity: '3/4' },
    { time: '14:00', cls: '매트 필라테스 B', instructor: '김강사', capacity: '7/10' },
    { time: '15:00', cls: '기구 필라테스 A', instructor: '이강사', capacity: '6/6' },
    { time: '16:00', cls: '매트 필라테스 C', instructor: '최강사', capacity: '5/10' },
];
function getCapacityPercent(capacity) {
    const [current, total] = capacity.split('/').map(Number);
    return (current / total) * 100;
}
export function DashboardPage() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
    return (_jsxs("div", { className: styles.container, children: [_jsxs("header", { className: styles.header, children: [_jsxs("div", { children: [_jsx("h1", { className: styles.title, children: "\uB300\uC2DC\uBCF4\uB4DC" }), _jsx("p", { className: styles.date, children: formattedDate })] }), _jsxs("button", { className: styles.quickAction, children: [_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }), "\uBE60\uB978 \uC608\uC57D"] })] }), _jsx("section", { className: styles.statsGrid, children: stats.map((stat, idx) => (_jsxs("div", { className: styles.statCard, style: { animationDelay: `${idx * 100}ms` }, children: [_jsx("div", { className: styles.statIcon, children: stat.icon }), _jsxs("div", { className: styles.statContent, children: [_jsx("span", { className: styles.statValue, children: stat.value }), _jsx("span", { className: styles.statLabel, children: stat.label })] }), stat.change && (_jsxs("span", { className: `${styles.statChange} ${styles[stat.trend || 'neutral']}`, children: [stat.trend === 'up' && '↑', stat.trend === 'down' && '↓', stat.change] }))] }, stat.label))) }), _jsxs("div", { className: styles.mainGrid, children: [_jsxs("section", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx("h2", { className: styles.cardTitle, children: "\uC624\uB298\uC758 \uC2A4\uCF00\uC904" }), _jsx("button", { className: styles.cardAction, children: "\uC804\uCCB4\uBCF4\uAE30" })] }), _jsx("div", { className: styles.scheduleList, children: todaySchedule.map((item, idx) => (_jsxs("div", { className: styles.scheduleItem, style: { animationDelay: `${200 + idx * 50}ms` }, children: [_jsx("div", { className: styles.scheduleTime, children: item.time }), _jsxs("div", { className: styles.scheduleInfo, children: [_jsx("span", { className: styles.scheduleClass, children: item.cls }), _jsx("span", { className: styles.scheduleInstructor, children: item.instructor })] }), _jsxs("div", { className: styles.scheduleCapacity, children: [_jsx("div", { className: styles.capacityBar, style: { '--fill': `${getCapacityPercent(item.capacity)}%` } }), _jsx("span", { children: item.capacity })] })] }, idx))) })] }), _jsxs("section", { className: styles.card, children: [_jsxs("div", { className: styles.cardHeader, children: [_jsx("h2", { className: styles.cardTitle, children: "\uCD5C\uADFC \uC608\uC57D" }), _jsx("button", { className: styles.cardAction, children: "\uC804\uCCB4\uBCF4\uAE30" })] }), _jsx("div", { className: styles.reservationList, children: recentReservations.map((reservation, idx) => (_jsxs("div", { className: styles.reservationItem, style: { animationDelay: `${200 + idx * 50}ms` }, children: [_jsx("div", { className: styles.reservationAvatar, children: reservation.member.charAt(0) }), _jsxs("div", { className: styles.reservationInfo, children: [_jsx("span", { className: styles.reservationMember, children: reservation.member }), _jsx("span", { className: styles.reservationClass, children: reservation.cls })] }), _jsxs("div", { className: styles.reservationMeta, children: [_jsx("span", { className: styles.reservationTime, children: reservation.time }), _jsxs("span", { className: `${styles.reservationStatus} ${styles[reservation.status]}`, children: [reservation.status === 'confirmed' && '확정', reservation.status === 'pending' && '대기', reservation.status === 'cancelled' && '취소'] })] })] }, reservation.id))) })] })] }), _jsxs("section", { className: styles.quickStats, children: [_jsxs("div", { className: styles.quickStatItem, children: [_jsx("span", { className: styles.quickStatLabel, children: "\uC774\uBC88 \uC8FC \uC2E0\uADDC \uD68C\uC6D0" }), _jsx("span", { className: styles.quickStatValue, children: "12\uBA85" })] }), _jsxs("div", { className: styles.quickStatItem, children: [_jsx("span", { className: styles.quickStatLabel, children: "\uB9CC\uB8CC \uC608\uC815 \uD68C\uC6D0\uAD8C" }), _jsx("span", { className: styles.quickStatValue, children: "8\uAC74" })] }), _jsxs("div", { className: styles.quickStatItem, children: [_jsx("span", { className: styles.quickStatLabel, children: "\uB300\uAE30 \uC911\uC778 \uD3C9\uAC00" }), _jsx("span", { className: styles.quickStatValue, children: "5\uAC74" })] })] })] }));
}
