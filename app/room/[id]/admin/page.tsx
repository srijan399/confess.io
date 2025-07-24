"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ArrowLeft,
    Trash2,
    Eye,
    EyeOff,
    Download,
    Search,
    Filter,
    MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

import { IConfession } from "@/app/_models/schema";

export default function AdminPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [confessions, setConfessions] = useState<IConfession[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | "hidden" | "reported">(
        "all"
    );
    const [roomName, setRoomName] = useState("Anonymous Thoughts");
    const [loading, setLoading] = useState(true);
    const resolvedParams = React.use(params);

    // Fetch confessions on component mount
    useEffect(() => {
        fetchConfessions();
    }, [resolvedParams.id]);

    const fetchConfessions = async () => {
        try {
            setLoading(true);
            console.log(resolvedParams.id);
            const response = await fetch(
                `http://localhost:3000/api/getConfessions?roomId=${resolvedParams.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            console.log("Fetched room:", data.room);

            if (data.success) {
                setConfessions(data.room.confessions);
                setRoomName(data.room.name);
            } else {
                console.error("Failed to load confessions:", data.error);
            }
        } catch (err) {
            console.error("Error fetching confessions:", err);
            setConfessions([]);
        } finally {
            setLoading(false);
        }
    };

    const getRandomAvatar = () => {
        const colors = [
            "bg-violet-500",
            "bg-cyan-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-cyan-900">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <header className="relative z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <Link href={`/room/${resolvedParams.id}`}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white/80 hover:text-white hover:bg-white/10"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Room
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-white/60">
                                    {roomName} - Room Management
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Confessions List */}
                <div className="space-y-4">
                    {loading ? (
                        <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                            <CardContent className="p-12 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="text-white/60">
                                        Loading confessions...
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ) : !confessions ? (
                        <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                            <CardContent className="p-12 text-center">
                                <p className="text-white/60">
                                    No confessions found matching your criteria.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        confessions.map((confession) => (
                            <Card
                                key={confession._id}
                                className={`backdrop-blur-lg border transition-all duration-300 
                                        bg-white/10 border-white/20 hover:bg-white/15`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback
                                                    className={`${getRandomAvatar()} text-white`}
                                                >
                                                    ?
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 space-y-3 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-white/20 text-white/80 text-xs"
                                                    >
                                                        Anonymous
                                                    </Badge>
                                                    <span className="text-white/60 text-sm">
                                                        {confession.timestamp.toString()}
                                                    </span>
                                                </div>

                                                <p className="text-white leading-relaxed break-words">
                                                    {confession.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}

                    {!loading && !confessions && (
                        <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                            <CardContent className="p-12 text-center">
                                <p className="text-white/60">
                                    No confessions found matching your criteria.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
