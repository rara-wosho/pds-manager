import React, { useRef, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";

import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Avatar({ initialAvatarUrl, userId, sessionId }) {
    const fileInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const updateAvatarMutation = useMutation({
        mutationFn: async (newUrl) => {
            const { error: userError } = await supabase
                .from("users")
                .update({ image_path: newUrl }) // ✅ update only this field
                .eq("user_id", userId);

            if (userError) throw userError;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file || !userId) return;

        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        console.log("fie path to be uploaded:", filePath);

        setUploading(true);

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) {
            console.error("Upload failed:", uploadError.message);
            alert("Failed to upload avatar.");
            setUploading(false);
            return;
        }

        // Get public URL
        const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);

        setAvatarUrl(data.publicUrl);

        // update the image path from users table
        updateAvatarMutation.mutate(data.publicUrl);
        setUploading(false);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();

        console.log("input clicked");
    };

    return (
        <div className="avatar-container center flex-column">
            <a
                target="_blank"
                href={avatarUrl || ""}
                className="profile-pic-container cursor mb-4 rounded-circle p-2 center position-relative"
            >
                <img
                    src={avatarUrl || "/images/default-img.jpg"}
                    className="rounded-circle"
                    width={165}
                    height={165}
                    alt="avatar"
                />
                <div className="check-badge">
                    <BsPatchCheckFill size={42} color="rgb(160, 64, 230)" />
                </div>
                {uploading && (
                    <div className="position-absolute rounded-circle w-100 h-100 center bg-white bg-opacity-75">
                        <span>Uploading...</span>
                    </div>
                )}
            </a>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
            />

            {sessionId.id === userId && (
                <div className="d-flex align-items-center">
                    <p
                        onClick={!uploading ? handleUploadClick : undefined}
                        className={`px-3 btn btn-outline-success rounded-pill mx-1 fs-7 ${
                            uploading ? "disabled" : ""
                        }`}
                    >
                        {uploading ? "Uploading..." : "Upload Avatar"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Avatar;
