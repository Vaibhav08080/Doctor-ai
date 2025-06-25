import { UsersDetails } from '@/provider';
import { createContext } from 'react';
export const UserDetailContext = createContext<UsersDetails | null>(null);