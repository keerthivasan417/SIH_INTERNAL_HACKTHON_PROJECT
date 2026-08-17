import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock login by default as a teacher for this testing context
    const mockUser = {
      uid: 'teacher-123',
      name: 'Renita Esther V',
      email: 'renita@school.edu',
      role: 'teacher',
      schoolName: 'Govt. Girls High School, Odia',
      academicYear: '2026-2027',
    }
    setUser(mockUser)
    setLoading(false)
  }, [])

  const login = (role = 'teacher') => {
    setLoading(true)
    const mockUser = {
      uid: `${role}-123`,
      name: role === 'teacher' ? 'Renita Esther V' : `${role.toUpperCase()} Mock User`,
      email: `${role}@school.edu`,
      role: role,
      schoolName: 'Govt. Girls High School, Odia',
      academicYear: '2026-2027',
    }
    setUser(mockUser)
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
