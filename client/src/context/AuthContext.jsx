import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USERS = {
  school_admin: {
    id: 'admin-001',
    name: 'Dr. B. K. Mohapatra',
    email: 'hm.baripada@ruraledu.odisha.gov.in',
    role: 'school_admin',
    schoolId: 'sch-01',
    schoolName: 'Govt. High School, Baripada',
    district: 'Mayurbhanj',
    block: 'Baripada Sadar',
    academicYear: '2026-2027',
  },
  super_admin: {
    id: 'super-001',
    name: 'Smt. Ananya Patnaik, IAS',
    email: 'dir.sme@odisha.gov.in',
    role: 'super_admin',
    department: 'School & Mass Education Department, Govt. of Odisha',
    academicYear: '2026-2027',
  },
  teacher: {
    id: 'tch-001',
    name: 'Shri Rameshwar Sahoo',
    email: 'rameshwar.s@ruraledu.odisha.gov.in',
    role: 'teacher',
    schoolId: 'sch-01',
    subject: 'Mathematics',
  },
  student: {
    id: 'std-001',
    name: 'Pooja Sethi',
    email: 'pooja.sethi@ruraledu.odisha.gov.in',
    role: 'student',
    class: 'Class 7-A',
    schoolId: 'sch-01',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ruraledu_auth_user');
      return stored ? JSON.parse(stored) : DEFAULT_USERS.school_admin;
    } catch {
      return DEFAULT_USERS.school_admin;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ruraledu_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ruraledu_auth_user');
    }
  }, [user]);

  const login = (role = 'school_admin') => {
    const targetUser = DEFAULT_USERS[role] || DEFAULT_USERS.school_admin;
    setUser(targetUser);
    return targetUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ruraledu_auth_user');
  };

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    hasRole,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
