import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('sv_user')
        if (stored) {
            try { setUser(JSON.parse(stored)) } catch { }
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        const u = { ...userData, loggedAt: new Date().toISOString() }
        setUser(u)
        localStorage.setItem('sv_user', JSON.stringify(u))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('sv_user')
    }

    const updateUser = (updates) => {
        const u = { ...user, ...updates }
        setUser(u)
        localStorage.setItem('sv_user', JSON.stringify(u))
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading, isAdmin: user?.role === 'admin', isEmployee: user?.role === 'employee' }}>
            {children}
        </AuthContext.Provider>
    )
}
