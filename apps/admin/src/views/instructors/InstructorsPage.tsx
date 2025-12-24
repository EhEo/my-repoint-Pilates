import { useEffect, useState } from 'react';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { instructorApi, Instructor } from '../../lib/api';
import styles from './InstructorsPage.module.css';
import memberStyles from '../members/MembersPage.module.css';

type InstructorFormData = {
  name: string;
  phone: string;
  email: string;
  specialty: string;
};

const initialFormData: InstructorFormData = {
  name: '',
  phone: '',
  email: '',
  specialty: '',
};

export function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [formData, setFormData] = useState<InstructorFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const data = await instructorApi.list();
      setInstructors(data);
      setError(null);
    } catch (err) {
      setError('강사 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
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
    setEditingInstructor(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setFormData({
      name: instructor.name,
      phone: instructor.phone,
      email: instructor.email || '',
      specialty: instructor.specialty || '',
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInstructor(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingInstructor) {
        await instructorApi.update(editingInstructor.id, formData);
      } else {
        await instructorApi.create(formData);
      }
      closeModal();
      fetchInstructors();
    } catch (err) {
      console.error(err);
      alert(editingInstructor ? '강사 수정에 실패했습니다.' : '강사 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (instructor: Instructor) => {
    if (!confirm(`${instructor.name} 강사를 삭제하시겠습니까?`)) return;
    try {
      await instructorApi.delete(instructor.id);
      fetchInstructors();
    } catch (err) {
      console.error(err);
      alert('강사 삭제에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  const handleStatusChange = async (instructor: Instructor, newStatus: 'active' | 'inactive') => {
    try {
      await instructorApi.update(instructor.id, { status: newStatus });
      fetchInstructors();
    } catch (err) {
      console.error(err);
      alert('상태 변경에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="강사" description="강사 정보를 관리할 수 있습니다" />
        <Card>
          <div className={memberStyles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="강사" description="강사 정보를 관리할 수 있습니다" />
        <Card>
          <div className={memberStyles.error}>
            {error}
            <button onClick={fetchInstructors} className={memberStyles.retryBtn}>
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
        title="강사"
        description="강사 정보를 관리할 수 있습니다"
        action={{
          label: '강사 등록',
          onClick: openCreateModal,
        }}
      />

      {instructors.length === 0 ? (
        <Card>
          <div className={memberStyles.empty}>등록된 강사가 없습니다.</div>
        </Card>
      ) : (
        <div className={styles.grid}>
          {instructors.map((instructor, idx) => (
            <Card key={instructor.id}>
              <div className={styles.instructorCard} style={{ animationDelay: `${idx * 100}ms` }}>
                <div className={styles.avatar}>{instructor.name.charAt(0)}</div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{instructor.name}</h3>
                  <p className={styles.specialty}>{instructor.specialty || '전문분야 미지정'}</p>
                  <div className={styles.contact}>
                    <span>{instructor.phone}</span>
                    <span>{instructor.email || '-'}</span>
                  </div>
                </div>
                <span className={`${styles.status} ${styles[instructor.status]}`}>
                  {instructor.status === 'active' ? '활성' : '비활성'}
                </span>
                <div className={styles.cardActions}>
                  <button
                    className={styles.cardActionBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === instructor.id ? null : instructor.id);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                  {openMenuId === instructor.id && (
                    <div className={styles.cardDropdown} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openEditModal(instructor)}>수정</button>
                      {instructor.status === 'active' ? (
                        <button onClick={() => handleStatusChange(instructor, 'inactive')}>
                          비활성으로 변경
                        </button>
                      ) : (
                        <button onClick={() => handleStatusChange(instructor, 'active')}>
                          활성으로 변경
                        </button>
                      )}
                      <button className={styles.deleteBtn} onClick={() => handleDelete(instructor)}>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingInstructor ? '강사 수정' : '강사 등록'}
      >
        <form onSubmit={handleSubmit}>
          <label>
            이름 *
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="홍길동"
            />
          </label>
          <label>
            연락처 *
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="010-0000-0000"
            />
          </label>
          <label>
            이메일
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
            />
          </label>
          <label>
            전문분야
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="매트 필라테스, 기구 필라테스"
            />
          </label>
          <div className={memberStyles.formActions}>
            <button type="button" className={memberStyles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={memberStyles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : editingInstructor ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
