import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import styles from '../members/MembersPage.module.css';

const mockAssessments = [
  { id: 1, member: '김지영', date: '2024-12-10', instructor: '박강사', type: '초기 평가', status: 'completed' },
  { id: 2, member: '이수민', date: '2024-12-11', instructor: '박강사', type: '정기 평가', status: 'completed' },
  { id: 3, member: '박현우', date: '2024-12-12', instructor: '박강사', type: '초기 평가', status: 'scheduled' },
  { id: 4, member: '최민지', date: '2024-12-15', instructor: '박강사', type: '재평가', status: 'scheduled' },
  { id: 5, member: '정다은', date: '2024-12-08', instructor: '박강사', type: '정기 평가', status: 'completed' },
];

export function AssessmentsPage() {
  return (
    <div className={styles.container}>
      <PageHeader
        title="신체평가"
        description="회원 신체평가 기록을 관리할 수 있습니다"
        action={{
          label: '평가 등록',
          onClick: () => console.log('평가 등록'),
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
            <option value="completed">완료</option>
            <option value="scheduled">예정</option>
          </select>
          <select className={styles.select}>
            <option value="">전체 유형</option>
            <option value="initial">초기 평가</option>
            <option value="regular">정기 평가</option>
            <option value="re">재평가</option>
          </select>
        </div>
      </div>

      <Card>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>회원</th>
              <th>날짜</th>
              <th>평가 유형</th>
              <th>담당 강사</th>
              <th>상태</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockAssessments.map((item, idx) => (
              <tr key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <td>
                  <div className={styles.memberName}>
                    <div className={styles.avatar}>{item.member.charAt(0)}</div>
                    <span>{item.member}</span>
                  </div>
                </td>
                <td className={styles.date}>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.instructor}</td>
                <td>
                  <span className={`${styles.status} ${item.status === 'completed' ? styles.active : styles.hold}`}>
                    {item.status === 'completed' ? '완료' : '예정'}
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
