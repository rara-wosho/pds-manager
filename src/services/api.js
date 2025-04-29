// services/userService.js
import { supabase } from "../supabase-client";

// Get all users with their related data
export async function getAllUsers() {
    const { data, error } = await supabase.from("users").select(`
            *,
            addresses(*),
            parents_guardians(*)
        `);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// Get a single user by ID
export async function getUserById(userId) {
    const { data, error } = await supabase
        .from("users")
        .select(
            `
            *,
            addresses(*),
            parents_guardians(*)
        `
        )
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.log("error from api, ", error);
        throw new Error(error.message);
    }

    return data;
}

// Example of how to use these queries with React Query
/*
import { useQuery } from '@tanstack/react-query';
import { getAllUsers, getUserById } from './services/userService';

// In your component:
function UsersList() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers
    });
    
    // Rest of component...
}

function UserProfile({ userId }) {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getUserById(userId)
    });
    
    // Rest of component...
}
*/

export async function updateUserInfo(user_id, data) {
    const { error } = await supabase.from("users").insert(data);
}
