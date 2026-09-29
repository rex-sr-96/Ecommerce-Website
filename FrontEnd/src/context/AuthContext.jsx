import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Error reading user from localStorage:", e);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("userToken") || null;
    });

    // Synchronize user changes with localStorage
    const login = (userData, userToken) => {
        try {
            localStorage.setItem("user", JSON.stringify(userData));
            if (userToken) {
                localStorage.setItem("userToken", userToken);
                setToken(userToken);
            }
            setUser(userData);
        } catch (err) {
            console.error("Error storing auth data:", err);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
            setUser(null);
            setToken(null);
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    const updateUserProfile = (updatedFields) => {
        setUser((prevUser) => {
            const updated = { ...prevUser, ...updatedFields };
            try {
                localStorage.setItem("user", JSON.stringify(updated));
            } catch (err) {
                console.error("Error updating user storage:", err);
            }
            return updated;
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: Boolean(user),
                login,
                logout,
                updateUserProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};