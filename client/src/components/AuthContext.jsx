import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { validateSession } from '../api/authHelper';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [status, setStatus] = useState('loading'); // loading | authenticated | unauthenticated
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function bootstrapAuth() {
            const result = await validateSession();

            if (!mounted) return;

            if (result.authenticated) {
                setUser(result.user);
                setStatus('authenticated');
            } else {
                setUser(null);
                setStatus('unauthenticated');
            }
        }

        bootstrapAuth();

        return () => {
            mounted = false;
        };
    }, []);

    const value = useMemo(
        () => ({ status, user, setStatus, setUser }),
        [status, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}