// checkUserSession.js
export const checkUserSession = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const parsedData = JSON.parse(userData);
        const now = new Date().getTime();

        // Check if the stored data has expired
        if (now > parsedData.expiresAt) {
            // If expired, remove from localStorage
            localStorage.removeItem('user');
            return null;
        }
        
        return parsedData; // Return user data if valid
    }
    return null;
};
