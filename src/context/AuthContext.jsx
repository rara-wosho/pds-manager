import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
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

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("there was an error while signing out", error);
        }

        return error;
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
