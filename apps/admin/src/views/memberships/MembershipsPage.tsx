import { useEffect, useState } from 'react';
import { PageHeader } from '../../ui/PageHeader';
import { Card } from '../../ui/Card';
import { Modal } from '../../ui/Modal';
import { membershipApi, memberApi, Membership, Member } from '../../lib/api';
import styles from '../members/MembersPage.module.css';

type MembershipFormData = {
  memberId: string;
  type: 'count' | 'period' | 'mixed';
  startDate: string;
  endDate: string;
  totalCount: string;
  remainingCount: string;
};

const initialFormData: MembershipFormData = {
  memberId: '',
  type: 'count',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  totalCount: '',
  remainingCount: '',
};

export function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState<Membership | null>(null);
  const [formData, setFormData] = useState<MembershipFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [membershipData, memberData] = await Promise.all([
        membershipApi.list(),
        memberApi.list(),
      ]);
      setMemberships(membershipData);
      setMembers(memberData);
      setError(null);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
    setEditingMembership(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (membership: Membership) => {
    setEditingMembership(membership);
    setFormData({
      memberId: membership.memberId,
      type: membership.type,
      startDate: membership.startDate.split('T')[0],
      endDate: membership.endDate ? membership.endDate.split('T')[0] : '',
      totalCount: membership.totalCount?.toString() || '',
      remainingCount: membership.remainingCount?.toString() || '',
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMembership(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        memberId: formData.memberId,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        totalCount: formData.totalCount ? parseInt(formData.totalCount) : undefined,
        remainingCount: formData.remainingCount ? parseInt(formData.remainingCount) : undefined,
      };

      if (editingMembership) {
        await membershipApi.update(editingMembership.id, payload);
      } else {
        await membershipApi.create(payload);
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
      alert(editingMembership ? '회원권 수정에 실패했습니다.' : '회원권 등록에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (membership: Membership) => {
    const memberName = membership.member?.name || '회원';
    if (!confirm(`${memberName}의 회원권을 삭제하시겠습니까?`)) return;
    try {
      await membershipApi.delete(membership.id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('회원권 삭제에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  const handleStatusChange = async (membership: Membership, newStatus: string) => {
    try {
      await membershipApi.update(membership.id, { status: newStatus as 'active' | 'expired' | 'paused' });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('상태 변경에 실패했습니다.');
    }
    setOpenMenuId(null);
  };

  // Filter memberships
  const filteredMemberships = memberships.filter((m) => {
    const matchesStatus = !statusFilter || m.status === statusFilter;
    const matchesType = !typeFilter || m.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'count':
        return '횟수제';
      case 'period':
        return '기간제';
      case 'mixed':
        return '혼합';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'expired':
        return '만료';
      case 'paused':
        return '일시정지';
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return styles.active;
      case 'expired':
        return styles.inactive;
      case 'paused':
        return styles.hold;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <PageHeader title="회원권" description="회원권을 관리할 수 있습니다" />
        <Card>
          <div className={styles.loading}>데이터를 불러오는 중...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <PageHeader title="회원권" description="회원권을 관리할 수 있습니다" />
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
        title="회원권"
        description="회원권을 관리할 수 있습니다"
        action={{
          label: '회원권 등록',
          onClick: openCreateModal,
        }}
      />

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">전체 상태</option>
            <option value="active">활성</option>
            <option value="expired">만료</option>
            <option value="paused">일시정지</option>
          </select>
          <select
            className={styles.select}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">전체 유형</option>
            <option value="count">횟수제</option>
            <option value="period">기간제</option>
            <option value="mixed">혼합</option>
          </select>
        </div>
      </div>

      <Card>
        {filteredMemberships.length === 0 ? (
          <div className={styles.empty}>
            {statusFilter || typeFilter ? '검색 결과가 없습니다.' : '등록된 회원권이 없습니다.'}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>회원</th>
                <th>유형</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>잔여/총 횟수</th>
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMemberships.map((membership, idx) => (
                <tr key={membership.id} style={{ animationDelay: `${idx * 50}ms` }}>
                  <td>
                    <div className={styles.memberName}>
                      <div className={styles.avatar}>
                        {membership.member?.name?.charAt(0) || '?'}
                      </div>
                      <span>{membership.member?.name || '-'}</span>
                    </div>
                  </td>
                  <td>{getTypeLabel(membership.type)}</td>
                  <td className={styles.date}>{formatDate(membership.startDate)}</td>
                  <td className={styles.date}>
                    {membership.endDate ? formatDate(membership.endDate) : '-'}
                  </td>
                  <td>
                    {membership.type !== 'period' && membership.totalCount
                      ? `${membership.remainingCount ?? 0} / ${membership.totalCount}`
                      : '-'}
                  </td>
                  <td>
                    <span className={`${styles.status} ${getStatusStyle(membership.status)}`}>
                      {getStatusLabel(membership.status)}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === membership.id ? null : membership.id);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                    {openMenuId === membership.id && (
                      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => openEditModal(membership)}>수정</button>
                        {membership.status !== 'active' && (
                          <button onClick={() => handleStatusChange(membership, 'active')}>
                            활성으로 변경
                          </button>
                        )}
                        {membership.status !== 'paused' && (
                          <button onClick={() => handleStatusChange(membership, 'paused')}>
                            일시정지
                          </button>
                        )}
                        {membership.status !== 'expired' && (
                          <button onClick={() => handleStatusChange(membership, 'expired')}>
                            만료 처리
                          </button>
                        )}
                        <button className={styles.deleteBtn} onClick={() => handleDelete(membership)}>
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
        title={editingMembership ? '회원권 수정' : '회원권 등록'}
      >
        <form onSubmit={handleSubmit}>
          <label>
            회원 *
            <select
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              required
              disabled={!!editingMembership}
            >
              <option value="">회원을 선택하세요</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.phone})
                </option>
              ))}
            </select>
          </label>
          <label>
            유형 *
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as 'count' | 'period' | 'mixed' })
              }
              required
            >
              <option value="count">횟수제</option>
              <option value="period">기간제</option>
              <option value="mixed">혼합</option>
            </select>
          </label>
          <label>
            시작일 *
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </label>
          <label>
            종료일
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </label>
          {formData.type !== 'period' && (
            <>
              <label>
                총 횟수
                <input
                  type="number"
                  min="0"
                  value={formData.totalCount}
                  onChange={(e) => setFormData({ ...formData, totalCount: e.target.value })}
                  placeholder="예: 30"
                />
              </label>
              <label>
                잔여 횟수
                <input
                  type="number"
                  min="0"
                  value={formData.remainingCount}
                  onChange={(e) => setFormData({ ...formData, remainingCount: e.target.value })}
                  placeholder="예: 30"
                />
              </label>
            </>
          )}
          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? '저장 중...' : editingMembership ? '수정' : '등록'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
