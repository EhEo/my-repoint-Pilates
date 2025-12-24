import { useEffect, useState } from 'react';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { scheduleApi, classApi, instructorApi, Schedule, Class, Instructor } from '../../lib/api';
import styles from './SchedulesPage.module.css';
import memberStyles from '../members/MembersPage.module.css';

type ScheduleWithReservations = Schedule & { reservations?: { id: string }[] };

type ScheduleFormData = {
  classId: string;
  instructorId: string;
  date: string;
  startTime: string;
  endTime: string;
};

const initialFormData: ScheduleFormData = {
  classId: '',
  instructorId: '',
  date: '',
  startTime: '09:00',
  endTime: '10:00',
};

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

function getWeekDates(baseDate: Date): Date[] {
  const dates: Date[] = [];
  const dayOfWeek = baseDate.getDay();
  const startOfWeek = new Date(baseDate);
  startOfWeek.setDate(baseDate.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatDateDisplay(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function getTimeSlot(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, '0');
  return `${hours}:00`;
}

export function SchedulesPage() {
  const [schedules, setSchedules] = useState<ScheduleWithReservations[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Current week
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDates = getWeekDates(currentDate);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleWithReservations | null>(null);
  const [formData, setFormData] = useState<ScheduleFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Detail modal state
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithReservations | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [schedulesData, classesData, instructorsData] = await Promise.all([
        scheduleApi.list(),
        classApi.list(),
        instructorApi.list(),
      ]);
      setSchedules(schedulesData as ScheduleWithReservations[]);
      setClasses(classesData);
      setInstructors(instructorsData.filter((i) => i.status === 'active'));
      setError(null);
    } catch (err) {
      setError('스케줄을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const openCreateModal = (date?: Date, time?: string) => {
    setEditingSchedule(null);
    setFormData({
      ...initialFormData,
      date: date ? formatDate(date) : formatDate(new Date()),
      startTime: time || '09:00',
      endTime: time
        ? `${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`
        : '10:00',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (schedule: ScheduleWithReservations) => {
    setEditingSchedule(schedule);
    const startDate = new Date(schedule.startTime);
    const endDate = new Date(schedule.endTime);
    setFormData({
      classId: schedule.classId,
      instructorId: schedule.instructorId || '',
      date: formatDate(startDate),
      startTime: `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`,
      endTime: `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
    });
    setIsModalOpen(true);
    setSelectedSchedule(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const startTime = `${formData.date}T${formData.startTime}:00`;
      const endTime = `${formData.date}T${formData.endTime}:00`;

      const data = {
        classId: formData.classId,
        instructorId: formData.instructorId || undefined,
        startTime,
        endTime,
      };

      if (editingSchedule) {
        await scheduleApi.update(editingSchedule.id, data);
      } else {
        await scheduleApi.create(data);
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
      alert(editingSchedule ? '스케줄 수정에 실패했습니다.' : '스케줄 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (schedule: ScheduleWithReservations) => {
    if (!confirm('이 스케줄을 삭제하시겠습니까?')) return;
    try {
      await scheduleApi.delete(schedule.id);
      setSelectedSchedule(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('스케줄 삭제에 실패했습니다.');
    }
  };

  const handleCancelSchedule = async (schedule: ScheduleWithReservations) => {
    if (!confirm('이 스케줄을 취소하시겠습니까?')) return;
    try {
      await scheduleApi.update(schedule.id, { status: 'cancelled' });
      setSelectedSchedule(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('스케줄 취소에 실패했습니다.');
    }
  };

  // Group schedules by date and time
  const getScheduleForSlot = (date: Date, time: string): ScheduleWithReservations | null => {
    const dateStr = formatDate(date);
    return (
      schedules.find((s) => {
        const scheduleDate = new Date(s.startTime);
        const scheduleDateStr = formatDate(scheduleDate);
        const scheduleTime = getTimeSlot(s.startTime);
        return scheduleDateStr === dateStr && scheduleTime === time;
      }) || null
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="스케줄" description="주간 수업 스케줄을 관리할 수 있습니다" />
        <Card>
          <div className={memberStyles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="스케줄" description="주간 수업 스케줄을 관리할 수 있습니다" />
        <Card>
          <div className={memberStyles.error}>
            {error}
            <button onClick={fetchData} className={memberStyles.retryBtn}>
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
        title="스케줄"
        description="주간 수업 스케줄을 관리할 수 있습니다"
        action={{
          label: '스케줄 추가',
          onClick: () => openCreateModal(),
        }}
      />

      <Card>
        <div className={styles.weekNav}>
          <button className={styles.navBtn} onClick={goToPreviousWeek}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className={styles.weekLabel}>
            {formatDateDisplay(weekDates[0])} ~ {formatDateDisplay(weekDates[6])}
          </span>
          <button className={styles.navBtn} onClick={goToNextWeek}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button className={styles.todayBtn} onClick={goToToday}>
            오늘
          </button>
        </div>

        <div className={styles.scheduleGrid}>
          <div className={styles.timeColumn}>
            <div className={styles.cornerCell}></div>
            {timeSlots.map((time) => (
              <div key={time} className={styles.timeCell}>
                {time}
              </div>
            ))}
          </div>
          {weekDates.map((date, dayIdx) => {
            const isToday = formatDate(date) === formatDate(new Date());
            return (
              <div key={dayIdx} className={styles.dayColumn}>
                <div className={`${styles.dayHeader} ${isToday ? styles.today : ''}`}>
                  <span className={styles.dayName}>{weekDays[dayIdx]}</span>
                  <span className={styles.dayDate}>{formatDateDisplay(date)}</span>
                </div>
                {timeSlots.map((time) => {
                  const schedule = getScheduleForSlot(date, time);
                  const isCancelled = schedule?.status === 'cancelled';
                  return (
                    <div
                      key={time}
                      className={`${styles.scheduleCell} ${schedule ? styles.hasClass : ''} ${isCancelled ? styles.cancelled : ''}`}
                      onClick={() => {
                        if (schedule) {
                          setSelectedSchedule(schedule);
                        } else {
                          openCreateModal(date, time);
                        }
                      }}
                    >
                      {schedule && (
                        <div className={styles.classCard}>
                          <span className={styles.className}>{schedule.class?.name}</span>
                          <span className={styles.instructor}>
                            {schedule.instructor?.name || schedule.class?.instructor?.name || '-'}
                          </span>
                          <span className={styles.capacity}>
                            {schedule.reservations?.length || 0}/{schedule.class?.maxCapacity || 0}
                          </span>
                          {isCancelled && <span className={styles.cancelledBadge}>취소됨</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Schedule Detail Modal */}
      <Modal
        isOpen={!!selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
        title="스케줄 상세"
        size="sm"
      >
        {selectedSchedule && (
          <div className={styles.scheduleDetail}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>수업</span>
              <span className={styles.detailValue}>{selectedSchedule.class?.name}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>강사</span>
              <span className={styles.detailValue}>
                {selectedSchedule.instructor?.name ||
                  selectedSchedule.class?.instructor?.name ||
                  '-'}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>시간</span>
              <span className={styles.detailValue}>
                {new Date(selectedSchedule.startTime).toLocaleString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                ~{' '}
                {new Date(selectedSchedule.endTime).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>예약</span>
              <span className={styles.detailValue}>
                {selectedSchedule.reservations?.length || 0} /{' '}
                {selectedSchedule.class?.maxCapacity || 0}명
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>상태</span>
              <span
                className={`${styles.detailValue} ${selectedSchedule.status === 'cancelled' ? styles.cancelledText : styles.activeText}`}
              >
                {selectedSchedule.status === 'cancelled' ? '취소됨' : '활성'}
              </span>
            </div>
            <div className={styles.detailActions}>
              <button
                className={memberStyles.cancelBtn}
                onClick={() => setSelectedSchedule(null)}
              >
                닫기
              </button>
              {selectedSchedule.status !== 'cancelled' && (
                <>
                  <button
                    className={styles.cancelScheduleBtn}
                    onClick={() => handleCancelSchedule(selectedSchedule)}
                  >
                    수업 취소
                  </button>
                  <button
                    className={memberStyles.submitBtn}
                    onClick={() => openEditModal(selectedSchedule)}
                  >
                    수정
                  </button>
                </>
              )}
              <button
                className={styles.deleteScheduleBtn}
                onClick={() => handleDelete(selectedSchedule)}
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit Schedule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSchedule ? '스케줄 수정' : '스케줄 추가'}
      >
        <form onSubmit={handleSubmit}>
          <label>
            수업 *
            <select
              value={formData.classId}
              onChange={(e) => {
                const selectedClass = classes.find((c) => c.id === e.target.value);
                setFormData({
                  ...formData,
                  classId: e.target.value,
                  instructorId: selectedClass?.instructorId || formData.instructorId,
                });
              }}
              required
            >
              <option value="">수업 선택</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            담당 강사
            <select
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
            >
              <option value="">강사 선택</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            날짜 *
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </label>
          <div className={styles.timeInputs}>
            <label>
              시작 시간 *
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </label>
            <label>
              종료 시간 *
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </label>
          </div>
          <div className={memberStyles.formActions}>
            <button type="button" className={memberStyles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={memberStyles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : editingSchedule ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
