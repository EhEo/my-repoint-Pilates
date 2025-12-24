import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from '../members/MembersPage.module.css';

const mockPrescriptions = [
  { id: 1, member: '김지영', createdAt: '2024-12-10', instructor: '박강사', focus: '코어 강화', duration: '8주', status: 'active' },
  { id: 2, member: '이수민', createdAt: '2024-12-01', instructor: '박강사', focus: '자세 교정', duration: '12주', status: 'active' },
  { id: 3, member: '박현우', createdAt: '2024-11-15', instructor: '박강사', focus: '재활 운동', duration: '16주', status: 'active' },
  { id: 4, member: '최민지', createdAt: '2024-10-01', instructor: '박강사', focus: '유연성 향상', duration: '8주', status: 'completed' },
  { id: 5, member: '정다은', createdAt: '2024-09-15', instructor: '박강사', focus: '근력 강화', duration: '12주', status: 'completed' },
];

export function PrescriptionsPage() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="운동처방"
        description="회원별 맞춤 운동 처방을 관리할 수 있습니다"
        action={{
          label: '처방 작성',
          onClick: () => console.log('처방 작성'),
        }}
      />

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="회원명으로 검색" />
        </div>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option value="">전체 상태</option>
            <option value="active">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>
      </div>

      <Card>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>회원</th>
              <th>작성일</th>
              <th>운동 목표</th>
              <th>기간</th>
              <th>담당 강사</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockPrescriptions.map((item, idx) => (
              <tr key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <td>
                  <div className={styles.memberName}>
                    <div className={styles.avatar}>{item.member.charAt(0)}</div>
                    <span>{item.member}</span>
                  </div>
                </td>
                <td className={styles.date}>{item.createdAt}</td>
                <td>{item.focus}</td>
                <td>{item.duration}</td>
                <td>{item.instructor}</td>
                <td>
                  <span className={`${styles.status} ${styles[item.status]}`}>
                    {item.status === 'active' ? '진행중' : '완료'}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
