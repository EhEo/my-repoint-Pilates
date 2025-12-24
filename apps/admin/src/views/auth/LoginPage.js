import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../lib/api';
import styles from './LoginPage.module.css';
export function LoginPage() {
    const nav = useNavigate();
    const [email, setEmail] = useState('admin@repoint.local');
    const [password, setPassword] = useState('admin1234');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    async function onLogin(e) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await apiPost('/auth/login', { email, password });
            localStorage.setItem('repoint_access_token', res.accessToken);
            nav('/dashboard');
        }
        catch (err) {
            setError(err?.message ?? '로그인에 실패했습니다');
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.bgPattern, "aria-hidden": "true", children: [_jsx("div", { className: styles.bgCircle1 }), _jsx("div", { className: styles.bgCircle2 }), _jsx("div", { className: styles.bgCircle3 })] }), _jsxs("div", { className: styles.card, children: [_jsxs("div", { className: styles.brand, children: [_jsx("div", { className: styles.logoMark, children: _jsxs("svg", { viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "20", cy: "20", r: "18", stroke: "currentColor", strokeWidth: "2" }), _jsx("path", { d: "M12 20C12 15.5817 15.5817 12 20 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), _jsx("path", { d: "M28 20C28 24.4183 24.4183 28 20 28", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), _jsx("circle", { cx: "20", cy: "20", r: "4", fill: "currentColor" })] }) }), _jsx("h1", { className: styles.title, children: "RePoint" }), _jsx("p", { className: styles.subtitle, children: "Pilates Studio Management" })] }), _jsxs("form", { className: styles.form, onSubmit: onLogin, children: [_jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { className: styles.label, htmlFor: "email", children: "\uC774\uBA54\uC77C" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsxs("svg", { className: styles.inputIcon, viewBox: "0 0 20 20", fill: "currentColor", children: [_jsx("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }), _jsx("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })] }), _jsx("input", { id: "email", type: "email", className: styles.input, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@repoint.local", autoComplete: "email", required: true })] })] }), _jsxs("div", { className: styles.inputGroup, children: [_jsx("label", { className: styles.label, htmlFor: "password", children: "\uBE44\uBC00\uBC88\uD638" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("svg", { className: styles.inputIcon, viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }), _jsx("input", { id: "password", type: "password", className: styles.input, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "current-password", required: true })] })] }), error && (_jsxs("div", { className: styles.error, children: [_jsx("svg", { viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), _jsx("span", { children: error })] })), _jsx("button", { type: "submit", className: styles.submitButton, disabled: isLoading, children: isLoading ? (_jsx("span", { className: styles.spinner })) : ('로그인') })] }), _jsx("div", { className: styles.footer, children: _jsx("p", { children: "Premium Pilates Studio Solution" }) })] }), _jsx("div", { className: styles.version, children: "v1.0.0" })] }));
}
