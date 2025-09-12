// Import Firebase modules
import { auth, googleProvider } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Authentication state management
let currentUser = null;

// Google Sign In
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('User signed in:', user.displayName);
        updateUI(user);
        return user;
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Sign in failed. Please try again.');
    }
}

// Sign Out
export async function signOutUser() {
    try {
        await signOut(auth);
        console.log('User signed out');
        updateUI(null);
    } catch (error) {
        console.error('Error signing out:', error);
    }
}

// Listen for authentication state changes
export function initAuthListener() {
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        updateUI(user);
    });
}

// Update UI based on authentication state
function updateUI(user) {
    const authButton = document.getElementById('auth-button');
    const userInfo = document.getElementById('user-info');
    
    if (user) {
        // User is signed in
        if (authButton) {
            authButton.textContent = 'Sign Out';
            authButton.onclick = signOutUser;
        }
        if (userInfo) {
            userInfo.innerHTML = `
                <img src="${user.photoURL}" alt="Profile" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
                <span>Welcome, ${user.displayName}!</span>
            `;
            userInfo.style.display = 'flex';
            userInfo.style.alignItems = 'center';
        }
    } else {
        // User is signed out
        if (authButton) {
            authButton.textContent = 'Sign In with Google';
            authButton.onclick = signInWithGoogle;
        }
        if (userInfo) {
            userInfo.style.display = 'none';
        }
    }
}

// Get current user
export function getCurrentUser() {
    return currentUser;
}