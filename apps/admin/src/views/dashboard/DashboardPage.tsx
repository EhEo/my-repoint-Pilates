import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  memberApi,
  scheduleApi,
  reservationApi,
  membershipApi,
  Member,
  Schedule,
  Reservation,
  Membership,
} from '../../lib/api';
import styles from './DashboardPage.module.css';

type ScheduleWithDetails = Schedule & {
  class?: { name: string; maxCapacity: number };
  instructor?: { name: string };
  _count?: { reservations: number };
};

type ReservationWithDetails = Reservation & {
  member?: { name: string };
  schedule?: {
    startTime: string;
    class?: { name: string };
  };
};

interface DashboardStats {
  todayReservations: number;
  activeMembers: number;
  monthlyClasses: number;
  reservationRate: number;
  newMembersThisWeek: number;
  expiringMemberships: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    todayReservations: 0,
    activeMembers: 0,
    monthlyClasses: 0,
    reservationRate: 0,
    newMembersThisWeek: 0,
    expiringMemberships: 0,
  });
  const [todaySchedule, setTodaySchedule] = useState<ScheduleWithDetails[]>([]);
  const [recentReservations, setRecentReservations] = useState<ReservationWithDetails[]>([]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [members, schedules, reservations, memberships] = await Promise.all([
          memberApi.list() as Promise<Member[]>,
          scheduleApi.list() as Promise<ScheduleWithDetails[]>,
          reservationApi.list() as Promise<ReservationWithDetails[]>,
          membershipApi.list() as Promise<Membership[]>,
        ]);

        // Calculate stats
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1);

        // Active members count
        const activeMembers = members.filter((m) => m.status === 'active').length;

        // Today's reservations count
        const todayReservations = reservations.filter((r) => {
          const scheduleTime = r.schedule?.startTime
            ? new Date(r.schedule.startTime)
            : null;
          return (
            scheduleTime &&
            scheduleTime >= todayStart &&
            scheduleTime < todayEnd &&
            r.status !== 'cancelled'
          );
        }).length;

        // Monthly classes count (this month)
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const monthlyClasses = schedules.filter((s) => {
          const scheduleDate = new Date(s.startTime);
          return scheduleDate >= monthStart && scheduleDate <= monthEnd && s.status === 'active';
        }).length;

        // Reservation rate calculation
        const activeSchedules = schedules.filter((s) => s.status === 'active');
        let totalCapacity = 0;
        let totalReservations = 0;
        activeSchedules.forEach((s) => {
          const capacity = s.class?.maxCapacity || 0;
          const reserved = s._count?.reservations || 0;
          totalCapacity += capacity;
          totalReservations += reserved;
        });
        const reservationRate =
          totalCapacity > 0 ? Math.round((totalReservations / totalCapacity) * 100) : 0;

        // New members this week
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newMembersThisWeek = members.filter((m) => new Date(m.createdAt) >= weekAgo).length;

        // Expiring memberships (within 7 days)
        const weekLater = new Date(now);
        weekLater.setDate(weekLater.getDate() + 7);
        const expiringMemberships = memberships.filter((m) => {
          const endDate = new Date(m.endDate);
          return endDate >= now && endDate <= weekLater && m.status === 'active';
        }).length;

        setStats({
          todayReservations,
          activeMembers,
          monthlyClasses,
          reservationRate,
          newMembersThisWeek,
          expiringMemberships,
        });

        // Today's schedule
        const todaySchedules = schedules
          .filter((s) => {
            const scheduleDate = new Date(s.startTime);
            return scheduleDate >= todayStart && scheduleDate < todayEnd;
          })
          .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
          .slice(0, 6);
        setTodaySchedule(todaySchedules);

        // Recent reservations (last 5)
        const sortedReservations = [...reservations]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setRecentReservations(sortedReservations);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: '오늘 예약',
      value: stats.todayReservations,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: '활성 회원',
      value: stats.activeMembers,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: '이번 달 수업',
      value: stats.monthlyClasses,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: '예약률',
      value: `${stats.reservationRate}%`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
    },
  ];

  const getCapacityPercent = (reserved: number, max: number): number => {
    return max > 0 ? (reserved / max) * 100 : 0;
  };

  const statusLabels: Record<string, string> = {
    confirmed: '확정',
    cancelled: '취소',
    attended: '출석',
    no_show: '미출석',
    waiting: '대기',
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>대시보드</h1>
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </header>
        <div className={styles.loading}>데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>대시보드</h1>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <button className={styles.quickAction} onClick={() => navigate('/reservations?action=create')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          빠른 예약
        </button>
      </header>

      <section className={styles.statsGrid}>
        {statCards.map((stat, idx) => (
          <div
            key={stat.label}
            className={styles.statCard}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>오늘의 스케줄</h2>
            <button className={styles.cardAction} onClick={() => navigate('/schedules')}>
              전체보기
            </button>
          </div>
          <div className={styles.scheduleList}>
            {todaySchedule.length === 0 ? (
              <div className={styles.emptyState}>오늘 예정된 수업이 없습니다.</div>
            ) : (
              todaySchedule.map((item, idx) => {
                const time = new Date(item.startTime).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const reserved = item._count?.reservations || 0;
                const maxCapacity = item.class?.maxCapacity || 0;
                return (
                  <div
                    key={item.id}
                    className={styles.scheduleItem}
                    style={{ animationDelay: `${200 + idx * 50}ms` }}
                  >
                    <div className={styles.scheduleTime}>{time}</div>
                    <div className={styles.scheduleInfo}>
                      <span className={styles.scheduleClass}>{item.class?.name || '수업'}</span>
                      <span className={styles.scheduleInstructor}>
                        {item.instructor?.name || '-'}
                      </span>
                    </div>
                    <div className={styles.scheduleCapacity}>
                      <div
                        className={styles.capacityBar}
                        style={
                          {
                            '--fill': `${getCapacityPercent(reserved, maxCapacity)}%`,
                          } as React.CSSProperties
                        }
                      />
                      <span>
                        {reserved}/{maxCapacity}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>최근 예약</h2>
            <button className={styles.cardAction} onClick={() => navigate('/reservations')}>
              전체보기
            </button>
          </div>
          <div className={styles.reservationList}>
            {recentReservations.length === 0 ? (
              <div className={styles.emptyState}>최근 예약이 없습니다.</div>
            ) : (
              recentReservations.map((reservation, idx) => {
                const scheduleTime = reservation.schedule?.startTime
                  ? new Date(reservation.schedule.startTime).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '-';
                return (
                  <div
                    key={reservation.id}
                    className={styles.reservationItem}
                    style={{ animationDelay: `${200 + idx * 50}ms` }}
                  >
                    <div className={styles.reservationAvatar}>
                      {reservation.member?.name?.charAt(0) || '?'}
                    </div>
                    <div className={styles.reservationInfo}>
                      <span className={styles.reservationMember}>
                        {reservation.member?.name || '-'}
                      </span>
                      <span className={styles.reservationClass}>
                        {reservation.schedule?.class?.name || '-'}
                      </span>
                    </div>
                    <div className={styles.reservationMeta}>
                      <span className={styles.reservationTime}>{scheduleTime}</span>
                      <span className={`${styles.reservationStatus} ${styles[reservation.status]}`}>
                        {statusLabels[reservation.status] || reservation.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <section className={styles.quickStats}>
        <div className={styles.quickStatItem}>
          <span className={styles.quickStatLabel}>이번 주 신규 회원</span>
          <span className={styles.quickStatValue}>{stats.newMembersThisWeek}명</span>
        </div>
        <div className={styles.quickStatItem}>
          <span className={styles.quickStatLabel}>만료 예정 회원권</span>
          <span className={styles.quickStatValue}>{stats.expiringMemberships}건</span>
        </div>
        <div className={styles.quickStatItem}>
          <span className={styles.quickStatLabel}>예약률</span>
          <span className={styles.quickStatValue}>{stats.reservationRate}%</span>
        </div>
      </section>
    </div>
  );
}
