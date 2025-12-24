import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../lib/api';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@repoint.local');
  const [password, setPassword] = useState('admin1234');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await apiPost<{ accessToken: string }>('/auth/login', { email, password });
      localStorage.setItem('repoint_access_token', res.accessToken);
      nav('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? '로그인에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {/* Background Pattern */}
      <div className={styles.bgPattern} aria-hidden="true">
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
        <div className={styles.bgCircle3} />
      </div>

      {/* Login Card */}
      <div className={styles.card}>
        {/* Logo & Brand */}
        <div className={styles.brand}>
          <div className={styles.logoMark}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 20C12 15.5817 15.5817 12 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M28 20C28 24.4183 24.4183 28 20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="4" fill="currentColor"/>
            </svg>
          </div>
          <h1 className={styles.title}>RePoint</h1>
          <p className={styles.subtitle}>Pilates Studio Management</p>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={onLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <div className={styles.inputWrapper}>
              <svg className={styles.inputIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@repoint.local"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <svg className={styles.inputIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner} />
            ) : (
              '로그인'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>Premium Pilates Studio Solution</p>
        </div>
      </div>

      {/* Version Tag */}
      <div className={styles.version}>v1.0.0</div>
    </div>
  );
}
