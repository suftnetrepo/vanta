import React, { createContext, useContext, useState } from 'react'

export interface UserProfile {
  name:     string
  initials: string
  email:    string
}

interface UserContextValue {
  user:    UserProfile
  setUser: (u: UserProfile) => void
}

const DEFAULT_USER: UserProfile = {
  name:     'there',
  initials: '?',
  email:    '',
}

const UserContext = createContext<UserContextValue>({
  user:    DEFAULT_USER,
  setUser: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
