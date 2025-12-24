import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import {
  reservationApi,
  memberApi,
  scheduleApi,
  Reservation,
  Member,
  Schedule,
} from '../../lib/api';
import styles from '../members/MembersPage.module.css';

type ReservationWithDetails = Reservation & {
  schedule?: Schedule & {
    class?: { name: string; maxCapacity: number };
    instructor?: { name: string };
  };
};

type ReservationFormData = {
  memberId: string;
  scheduleId: string;
};

const initialFormData: ReservationFormData = {
  memberId: '',
  scheduleId: '',
};

const statusLabels: Record<string, string> = {
  confirmed: '확정',
  cancelled: '취소',
  attended: '출석',
  no_show: '미출석',
  waiting: '대기',
};

export function ReservationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ReservationFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reservationsData, membersData, schedulesData] = await Promise.all([
        reservationApi.list(),
        memberApi.list(),
        scheduleApi.list(),
      ]);
      setReservations(reservationsData as ReservationWithDetails[]);
      setMembers(membersData.filter((m) => m.status === 'active'));
      // Only show future schedules for new reservations
      const now = new Date();
      setSchedules(
        schedulesData.filter((s) => new Date(s.startTime) > now && s.status === 'active')
      );
      setError(null);
    } catch (err) {
      setError('예약 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check for ?action=create query parameter to open modal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'create') {
      setIsModalOpen(true);
      // Remove query parameter from URL
      navigate('/reservations', { replace: true });
    }
  }, [location.search, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const openCreateModal = () => {
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await reservationApi.create(formData);
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
      alert('예약 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    reservation: ReservationWithDetails,
    newStatus: 'confirmed' | 'cancelled' | 'attended' | 'no_show'
  ) => {
    try {
      await reservationApi.update(reservation.id, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('상태 변경에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  const handleDelete = async (reservation: ReservationWithDetails) => {
    if (!confirm('이 예약을 삭제하시겠습니까?')) return;
    try {
      await reservationApi.delete(reservation.id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('예약 삭제에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  // Filter reservations
  const filteredReservations = reservations.filter((res) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const memberName = res.member?.name?.toLowerCase() || '';
      const className = res.schedule?.class?.name?.toLowerCase() || '';
      if (!memberName.includes(search) && !className.includes(search)) {
        return false;
      }
    }

    // Status filter
    if (statusFilter && res.status !== statusFilter) {
      return false;
    }

    // Date filter
    if (dateFilter) {
      const scheduleDate = new Date(res.schedule?.startTime || '').toISOString().split('T')[0];
      if (scheduleDate !== dateFilter) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="예약" description="회원 예약을 관리하고 확인할 수 있습니다" />
        <Card>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="예약" description="회원 예약을 관리하고 확인할 수 있습니다" />
        <Card>
          <div className={styles.error}>
            {error}
            <button onClick={fetchData} className={styles.retryBtn}>
              다시 시도
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title="예약"
        description="회원 예약을 관리하고 확인할 수 있습니다"
        action={{
          label: '예약 추가',
          onClick: openCreateModal,
        }}
      />

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="회원명, 수업명으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">전체 상태</option>
            <option value="confirmed">확정</option>
            <option value="attended">출석</option>
            <option value="no_show">미출석</option>
            <option value="cancelled">취소</option>
            <option value="waiting">대기</option>
          </select>
          <input
            type="date"
            className={styles.select}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <Card>
          <div className={styles.empty}>등록된 예약이 없습니다.</div>
        </Card>
      ) : (
        <Card>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>회원</th>
                <th>수업</th>
                <th>날짜</th>
                <th>시간</th>
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((item, idx) => {
                const scheduleDate = item.schedule?.startTime
                  ? new Date(item.schedule.startTime)
                  : null;
                return (
                  <tr key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
                    <td>
                      <div className={styles.memberName}>
                        <div className={styles.avatar}>{item.member?.name?.charAt(0) || '?'}</div>
                        <span>{item.member?.name || '-'}</span>
                      </div>
                    </td>
                    <td>{item.schedule?.class?.name || '-'}</td>
                    <td className={styles.date}>
                      {scheduleDate
                        ? scheduleDate.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : '-'}
                    </td>
                    <td>
                      {scheduleDate
                        ? scheduleDate.toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>
                    <td>
                      <span className={`${styles.status} ${styles[item.status]}`}>
                        {statusLabels[item.status] || item.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <button
                          className={styles.actionBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === item.id ? null : item.id);
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>
                        {openMenuId === item.id && (
                          <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                            {item.status !== 'confirmed' && (
                              <button onClick={() => handleStatusChange(item, 'confirmed')}>
                                확정으로 변경
                              </button>
                            )}
                            {item.status !== 'attended' && (
                              <button onClick={() => handleStatusChange(item, 'attended')}>
                                출석 처리
                              </button>
                            )}
                            {item.status !== 'no_show' && (
                              <button onClick={() => handleStatusChange(item, 'no_show')}>
                                미출석 처리
                              </button>
                            )}
                            {item.status !== 'cancelled' && (
                              <button onClick={() => handleStatusChange(item, 'cancelled')}>
                                취소로 변경
                              </button>
                            )}
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDelete(item)}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title="예약 추가">
        <form onSubmit={handleSubmit}>
          <label>
            회원 *
            <select
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              required
            >
              <option value="">회원 선택</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.phone})
                </option>
              ))}
            </select>
          </label>
          <label>
            스케줄 *
            <select
              value={formData.scheduleId}
              onChange={(e) => setFormData({ ...formData, scheduleId: e.target.value })}
              required
            >
              <option value="">스케줄 선택</option>
              {schedules.map((schedule) => {
                const date = new Date(schedule.startTime);
                const scheduleWithClass = schedule as Schedule & {
                  class?: { name: string };
                  instructor?: { name: string };
                };
                return (
                  <option key={schedule.id} value={schedule.id}>
                    {date.toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    {date.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    - {scheduleWithClass.class?.name || '수업'}
                    {scheduleWithClass.instructor?.name
                      ? ` (${scheduleWithClass.instructor.name})`
                      : ''}
                  </option>
                );
              })}
            </select>
          </label>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
