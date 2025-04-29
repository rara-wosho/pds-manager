import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);

            console.log("session :", session);
            setLoading(false);
        });

        // Set up auth listener - THIS IS THE CRITICAL PART YOU'RE MISSING
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth state changed:", _event);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Clean up subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    const signUpWithEmail = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        return { data, error };
    };

    const signInUser = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        return { data, error };
    };

    // const signOutUser = async () => {
    //     const { error } = await supabase.auth.signOut();

    //     if (error) {
    //         console.error("there was an error while signing out", error);
    //     }

    //     return error;
    // };

    // Fixed logout function for Supabase in AuthContext.jsx
    const signOutUser = async () => {
        try {
            // Get the current session first
            const { data: session } = await supabase.auth.getSession();

            // Only attempt to sign out if there's an active session
            if (session && session.session) {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    console.error("Error during sign out:", error.message);
                }
            }

            // Clear user state regardless of whether there was a session
            setUser(null);

            // If you're storing anything in localStorage, clear it
            localStorage.removeItem("sb-fwwqazzqggebcrkwzcqs-auth-token");
        } catch (error) {
            console.error("There was an error while signing out:", error);
        }
    };

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="d-flex justify-content-center p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, signUpWithEmail, signOutUser, signInUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
