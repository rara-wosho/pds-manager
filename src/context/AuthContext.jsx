import { createContext, useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const signIn = (email, password, e) => {
        e.preventDefault();
        console.log("clicked sign in");

        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async ({ email, password }) => {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;
                return data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
        });
    };

    return (
        <AuthContext.Provider value={{ signIn }}>
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
