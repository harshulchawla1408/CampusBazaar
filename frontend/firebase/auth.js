// frontend/firebase/auth.js

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './config';

// Only login and logout supported
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
