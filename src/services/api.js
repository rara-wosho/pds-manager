import { supabase } from "../supabase-client";

export async function getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateUserInfo(user_id, data) {
    const { error } = await supabase.from("users").insert(data);
}
