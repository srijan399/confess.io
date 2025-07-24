"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoomRedirect() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to a demo room for testing
        router.push("/room/demo-room-123");
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-cyan-900 flex items-center justify-center">
            <div className="text-white text-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p>Redirecting to room...</p>
            </div>
        </div>
    );
}
