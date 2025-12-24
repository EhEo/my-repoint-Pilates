import { useEffect, useState } from 'react';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { memberApi, Member } from '../../lib/api';
import styles from './MembersPage.module.css';

type MemberFormData = {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  memo: string;
};

const initialFormData: MemberFormData = {
  name: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: '',
  memo: '',
};

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await memberApi.list();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError('회원 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
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
    setEditingMember(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      email: member.email || '',
      birthDate: member.birthDate ? member.birthDate.split('T')[0] : '',
      gender: member.gender || '',
      memo: member.memo || '',
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingMember) {
        await memberApi.update(editingMember.id, formData);
      } else {
        await memberApi.create(formData);
      }
      closeModal();
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert(editingMember ? '회원 수정에 실패했습니다.' : '회원 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`${member.name} 회원을 삭제하시겠습니까?`)) return;
    try {
      await memberApi.delete(member.id);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert('회원 삭제에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  const handleStatusChange = async (member: Member, newStatus: 'active' | 'inactive' | 'expired') => {
    try {
      await memberApi.update(member.id, { status: newStatus });
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert('상태 변경에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      !searchQuery ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'inactive':
        return '비활성';
      case 'expired':
        return '만료';
      default:
        return status;
    }
  };

  const getMembershipDisplay = (member: Member) => {
    if (member.memberships && member.memberships.length > 0) {
      const m = member.memberships[0];
      if (m.type === 'count' && m.remainingCount !== undefined) {
        return `${m.remainingCount}회 남음`;
      }
      if (m.type === 'period' && m.endDate) {
        return `~${new Date(m.endDate).toLocaleDateString('ko-KR')}`;
      }
      return m.type === 'count' ? '횟수제' : '기간제';
    }
    return '-';
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="회원" description="회원 정보를 관리하고 검색할 수 있습니다" />
        <Card>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="회원" description="회원 정보를 관리하고 검색할 수 있습니다" />
        <Card>
          <div className={styles.error}>
            {error}
            <button onClick={fetchMembers} className={styles.retryBtn}>
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
        title="회원"
        description="회원 정보를 관리하고 검색할 수 있습니다"
        action={{
          label: '회원 등록',
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
            placeholder="이름, 이메일, 연락처로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="expired">만료</option>
          </select>
        </div>
      </div>

      <Card>
        {filteredMembers.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery || statusFilter ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이름</th>
                <th>연락처</th>
                <th>이메일</th>
                <th>회원권</th>
                <th>상태</th>
                <th>가입일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, idx) => (
                <tr key={member.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <td>
                    <div className={styles.memberName}>
                      <div className={styles.avatar}>{member.name.charAt(0)}</div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>{member.phone}</td>
                  <td className={styles.email}>{member.email || '-'}</td>
                  <td>{getMembershipDisplay(member)}</td>
                  <td>
                    <span className={`${styles.status} ${styles[member.status]}`}>
                      {getStatusLabel(member.status)}
                    </span>
                  </td>
                  <td className={styles.date}>{formatDate(member.createdAt)}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === member.id ? null : member.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                    {openMenuId === member.id && (
                      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => openEditModal(member)}>수정</button>
                        {member.status !== 'active' && (
                          <button onClick={() => handleStatusChange(member, 'active')}>
                            활성으로 변경
                          </button>
                        )}
                        {member.status !== 'inactive' && (
                          <button onClick={() => handleStatusChange(member, 'inactive')}>
                            비활성으로 변경
                          </button>
                        )}
                        <button className={styles.deleteBtn} onClick={() => handleDelete(member)}>
                          삭제
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingMember ? '회원 수정' : '회원 등록'}
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
            생년월일
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </label>
          <label>
            성별
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">선택 안함</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </label>
          <label>
            메모
            <textarea
              value={formData.memo}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              placeholder="회원에 대한 메모를 입력하세요"
            />
          </label>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : editingMember ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
