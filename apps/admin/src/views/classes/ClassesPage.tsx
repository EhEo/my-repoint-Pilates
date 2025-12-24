import { useEffect, useState } from 'react';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { classApi, Class, instructorApi, Instructor } from '../../lib/api';
import styles from '../members/MembersPage.module.css';

type ClassFormData = {
  name: string;
  type: 'private' | 'duet' | 'group' | 'large_group';
  maxCapacity: number;
  durationMin: number;
  instructorId: string;
  level: string;
  equipment: string;
};

const initialFormData: ClassFormData = {
  name: '',
  type: 'group',
  maxCapacity: 10,
  durationMin: 50,
  instructorId: '',
  level: '',
  equipment: '',
};

const classTypeLabels: Record<string, string> = {
  private: '개인',
  duet: '듀엣',
  group: '그룹',
  large_group: '대그룹',
};

export function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState<ClassFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const [classesData, instructorsData] = await Promise.all([
        classApi.list(),
        instructorApi.list(),
      ]);
      setClasses(classesData);
      setInstructors(instructorsData.filter((i) => i.status === 'active'));
      setError(null);
    } catch (err) {
      setError('수업 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const openCreateModal = () => {
    setEditingClass(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (classItem: Class) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      type: classItem.type,
      maxCapacity: classItem.maxCapacity,
      durationMin: classItem.durationMin,
      instructorId: classItem.instructorId || '',
      level: classItem.level || '',
      equipment: classItem.equipment || '',
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...formData,
        instructorId: formData.instructorId || undefined,
      };
      if (editingClass) {
        await classApi.update(editingClass.id, data);
      } else {
        await classApi.create(data);
      }
      closeModal();
      fetchClasses();
    } catch (err) {
      console.error(err);
      alert(editingClass ? '수업 수정에 실패했습니다.' : '수업 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (classItem: Class) => {
    if (!confirm(`${classItem.name} 수업을 삭제하시겠습니까?`)) return;
    try {
      await classApi.delete(classItem.id);
      fetchClasses();
    } catch (err) {
      console.error(err);
      alert('수업 삭제에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="수업" description="수업 유형과 정보를 관리할 수 있습니다" />
        <Card>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="수업" description="수업 유형과 정보를 관리할 수 있습니다" />
        <Card>
          <div className={styles.error}>
            {error}
            <button onClick={fetchClasses} className={styles.retryBtn}>
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
        title="수업"
        description="수업 유형과 정보를 관리할 수 있습니다"
        action={{
          label: '수업 추가',
          onClick: openCreateModal,
        }}
      />

      {classes.length === 0 ? (
        <Card>
          <div className={styles.empty}>등록된 수업이 없습니다.</div>
        </Card>
      ) : (
        <Card>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>수업명</th>
                <th>유형</th>
                <th>정원</th>
                <th>시간</th>
                <th>난이도</th>
                <th>담당 강사</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item, idx) => (
                <tr key={item.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>{classTypeLabels[item.type] || item.type}</td>
                  <td>{item.maxCapacity}명</td>
                  <td>{item.durationMin}분</td>
                  <td>{item.level || '-'}</td>
                  <td>{item.instructor?.name || '-'}</td>
                  <td>
                    <div className={styles.actionCell}>
                      <button
                        className={styles.actionBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === item.id ? null : item.id);
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                      {openMenuId === item.id && (
                        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => openEditModal(item)}>수정</button>
                          <button className={styles.deleteBtn} onClick={() => handleDelete(item)}>
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingClass ? '수업 수정' : '수업 추가'}
      >
        <form onSubmit={handleSubmit}>
          <label>
            수업명 *
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="매트 필라테스 A반"
            />
          </label>
          <label>
            유형 *
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as ClassFormData['type'],
                })
              }
              required
            >
              <option value="private">개인</option>
              <option value="duet">듀엣</option>
              <option value="group">그룹</option>
              <option value="large_group">대그룹</option>
            </select>
          </label>
          <label>
            정원 *
            <input
              type="number"
              value={formData.maxCapacity}
              onChange={(e) =>
                setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 1 })
              }
              required
              min={1}
              max={50}
            />
          </label>
          <label>
            수업 시간 (분) *
            <input
              type="number"
              value={formData.durationMin}
              onChange={(e) =>
                setFormData({ ...formData, durationMin: parseInt(e.target.value) || 50 })
              }
              required
              min={10}
              max={180}
            />
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
            난이도
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option value="">난이도 선택</option>
              <option value="beginner">초급</option>
              <option value="intermediate">중급</option>
              <option value="advanced">고급</option>
              <option value="all">전체</option>
            </select>
          </label>
          <label>
            필요 기구
            <input
              type="text"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              placeholder="리포머, 캐딜락"
            />
          </label>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : editingClass ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
