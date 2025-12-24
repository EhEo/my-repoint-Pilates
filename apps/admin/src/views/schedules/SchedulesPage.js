import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from './SchedulesPage.module.css';
const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const mockSchedule = {
    '월': {
        '09:00': { cls: '매트 A', instructor: '김강사', booked: 8, capacity: 10 },
        '10:00': { cls: '기구 B', instructor: '이강사', booked: 4, capacity: 6 },
        '14:00': { cls: '매트 B', instructor: '김강사', booked: 6, capacity: 10 },
        '15:00': { cls: '재활', instructor: '박강사', booked: 3, capacity: 4 },
    },
    '화': {
        '10:00': { cls: '매트 A', instructor: '김강사', booked: 9, capacity: 10 },
        '11:00': { cls: '기구 A', instructor: '이강사', booked: 6, capacity: 6 },
        '16:00': { cls: '매트 C', instructor: '최강사', booked: 5, capacity: 10 },
    },
    '수': {
        '09:00': { cls: '기구 B', instructor: '이강사', booked: 5, capacity: 6 },
        '14:00': { cls: '재활', instructor: '박강사', booked: 4, capacity: 4 },
        '18:00': { cls: '매트 A', instructor: '김강사', booked: 7, capacity: 10 },
    },
};
export function SchedulesPage() {
    return (_jsxs("div", { className: styles.container, children: [_jsx(PageHeader, { title: "\uC2A4\uCF00\uC904", description: "\uC8FC\uAC04 \uC218\uC5C5 \uC2A4\uCF00\uC904\uC744 \uAD00\uB9AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4", action: {
                    label: '스케줄 추가',
                    onClick: () => console.log('스케줄 추가'),
                } }), _jsx(Card, { children: _jsxs("div", { className: styles.scheduleGrid, children: [_jsxs("div", { className: styles.timeColumn, children: [_jsx("div", { className: styles.cornerCell }), timeSlots.map(time => (_jsx("div", { className: styles.timeCell, children: time }, time)))] }), weekDays.map(day => (_jsxs("div", { className: styles.dayColumn, children: [_jsx("div", { className: styles.dayHeader, children: day }), timeSlots.map(time => {
                                    const schedule = mockSchedule[day]?.[time];
                                    return (_jsx("div", { className: `${styles.scheduleCell} ${schedule ? styles.hasClass : ''}`, children: schedule && (_jsxs("div", { className: styles.classCard, children: [_jsx("span", { className: styles.className, children: schedule.cls }), _jsx("span", { className: styles.instructor, children: schedule.instructor }), _jsxs("span", { className: styles.capacity, children: [schedule.booked, "/", schedule.capacity] })] })) }, time));
                                })] }, day)))] }) })] }));
}
