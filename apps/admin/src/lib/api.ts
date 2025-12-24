export type ApiConfig = {
  baseUrl: string;
};

export const apiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
};

function getAccessToken(): string | null {
  return localStorage.getItem('repoint_access_token');
}

export async function apiGet<T>(path: string): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API GET ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API POST ${path} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API PUT ${path} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export async function apiDelete<T>(path: string): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API DELETE ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) {
    return {} as T;
  }
  return (await res.json()) as T;
}

// Types
export interface Member {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  status: 'active' | 'inactive' | 'expired';
  memo?: string;
  createdAt: string;
  updatedAt: string;
  memberships?: Membership[];
}

export interface Membership {
  id: string;
  memberId: string;
  type: 'count' | 'period' | 'mixed';
  totalCount?: number;
  remainingCount?: number;
  startDate: string;
  endDate?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  member?: Member;
}

export interface Instructor {
  id: string;
  name: string;
  phone: string;
  email?: string;
  specialty?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  type: 'private' | 'duet' | 'group' | 'large_group';
  instructorId?: string;
  maxCapacity: number;
  durationMin: number;
  level?: string;
  equipment?: string;
  createdAt: string;
  updatedAt: string;
  instructor?: Instructor;
}

export interface Schedule {
  id: string;
  classId: string;
  instructorId?: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  class?: Class;
  instructor?: Instructor;
}

export interface Reservation {
  id: string;
  memberId: string;
  scheduleId: string;
  status: 'confirmed' | 'cancelled' | 'attended' | 'no_show' | 'waiting';
  reservedAt: string;
  cancelledAt?: string;
  attendedAt?: string;
  member?: Member;
  schedule?: Schedule;
}

// Member API
export const memberApi = {
  list: () => apiGet<Member[]>('/members'),
  get: (id: string) => apiGet<Member>(`/members/${id}`),
  create: (data: Partial<Member>) => apiPost<Member>('/members', data),
  update: (id: string, data: Partial<Member>) => apiPut<Member>(`/members/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/members/${id}`),
};

// Membership API
export const membershipApi = {
  list: () => apiGet<Membership[]>('/memberships'),
  get: (id: string) => apiGet<Membership>(`/memberships/${id}`),
  create: (data: Partial<Membership>) => apiPost<Membership>('/memberships', data),
  update: (id: string, data: Partial<Membership>) => apiPut<Membership>(`/memberships/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/memberships/${id}`),
};

// Instructor API
export const instructorApi = {
  list: () => apiGet<Instructor[]>('/instructors'),
  get: (id: string) => apiGet<Instructor>(`/instructors/${id}`),
  create: (data: Partial<Instructor>) => apiPost<Instructor>('/instructors', data),
  update: (id: string, data: Partial<Instructor>) => apiPut<Instructor>(`/instructors/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/instructors/${id}`),
};

// Class API
export const classApi = {
  list: () => apiGet<Class[]>('/classes'),
  get: (id: string) => apiGet<Class>(`/classes/${id}`),
  create: (data: Partial<Class>) => apiPost<Class>('/classes', data),
  update: (id: string, data: Partial<Class>) => apiPut<Class>(`/classes/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/classes/${id}`),
};

// Schedule API
export const scheduleApi = {
  list: () => apiGet<Schedule[]>('/schedules'),
  get: (id: string) => apiGet<Schedule>(`/schedules/${id}`),
  create: (data: Partial<Schedule>) => apiPost<Schedule>('/schedules', data),
  update: (id: string, data: Partial<Schedule>) => apiPut<Schedule>(`/schedules/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/schedules/${id}`),
};

// Reservation API
export const reservationApi = {
  list: () => apiGet<Reservation[]>('/reservations'),
  get: (id: string) => apiGet<Reservation>(`/reservations/${id}`),
  create: (data: Partial<Reservation>) => apiPost<Reservation>('/reservations', data),
  update: (id: string, data: Partial<Reservation>) => apiPut<Reservation>(`/reservations/${id}`, data),
  delete: (id: string) => apiDelete<void>(`/reservations/${id}`),
};
