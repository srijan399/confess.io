"use client";

import type React from "react";
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

interface Confession {
    id: string;
    content: string;
    timestamp: string;
    likes: number;
    replies: number;
    views: number;
    isLiked: boolean;
    isHidden?: boolean;
    reportCount?: number;
}

export default function AdminPage({ params }: { params: { id: string } }) {
    const [confessions, setConfessions] = useState<Confession[]>([
        {
            id: "1",
            content:
                "I've been pretending to understand cryptocurrency for 2 years just to fit in with my tech friends. I still have no idea what a blockchain actually is.",
            timestamp: "2 hours ago",
            likes: 24,
            replies: 8,
            views: 156,
            isLiked: false,
            isHidden: false,
            reportCount: 1,
        },
        {
            id: "2",
            content:
                "I eat cereal for dinner at least 3 times a week because I'm too lazy to cook. My parents think I'm this independent adult but I'm basically a child.",
            timestamp: "5 hours ago",
            likes: 18,
            replies: 12,
            views: 203,
            isLiked: true,
            isHidden: false,
            reportCount: 0,
        },
        {
            id: "3",
            content:
                "I've been using the same password for everything since 2015. It's my pet's name followed by '123'. I know it's terrible but I'm too scared to change it now.",
            timestamp: "1 day ago",
            likes: 31,
            replies: 6,
            views: 289,
            isLiked: false,
            isHidden: false,
            reportCount: 3,
        },
        {
            id: "4",
            content:
                "I secretly read my roommate's diary and found out they have a crush on me. Now I don't know how to act around them.",
            timestamp: "2 days ago",
            likes: 45,
            replies: 23,
            views: 567,
            isLiked: false,
            isHidden: true,
            reportCount: 5,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | "hidden" | "reported">(
        "all"
    );

    const roomName = "Anonymous Thoughts";

    const filteredConfessions = confessions.filter((confession) => {
        const matchesSearch = confession.content
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterType === "all" ||
            (filterType === "hidden" && confession.isHidden) ||
            (filterType === "reported" && (confession.reportCount || 0) > 0);

        return matchesSearch && matchesFilter;
    });

    const handleToggleVisibility = (id: string) => {
        setConfessions((prev) =>
            prev.map((conf) =>
                conf.id === id ? { ...conf, isHidden: !conf.isHidden } : conf
            )
        );
    };

    const handleDeleteConfession = (id: string) => {
        if (
            confirm(
                "Are you sure you want to delete this confession? This action cannot be undone."
            )
        ) {
            setConfessions((prev) => prev.filter((conf) => conf.id !== id));
        }
    };

    const exportConfessions = () => {
        const dataStr = JSON.stringify(confessions, null, 2);
        const dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);

        const exportFileDefaultName = `confessions-${params.id}-${
            new Date().toISOString().split("T")[0]
        }.json`;

        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
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

    const stats = {
        total: confessions.length,
        hidden: confessions.filter((c) => c.isHidden).length,
        reported: confessions.filter((c) => (c.reportCount || 0) > 0).length,
        totalViews: confessions.reduce((sum, c) => sum + c.views, 0),
        totalLikes: confessions.reduce((sum, c) => sum + c.likes, 0),
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
                            <Link href={`/room/${params.id}`}>
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

                        <Button
                            onClick={exportConfessions}
                            variant="ghost"
                            size="sm"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">
                                {stats.total}
                            </div>
                            <div className="text-sm text-white/60">
                                Total Confessions
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">
                                {stats.hidden}
                            </div>
                            <div className="text-sm text-white/60">Hidden</div>
                        </CardContent>
                    </Card>
                    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">
                                {stats.reported}
                            </div>
                            <div className="text-sm text-white/60">
                                Reported
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">
                                {stats.totalViews}
                            </div>
                            <div className="text-sm text-white/60">
                                Total Views
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-white">
                                {stats.totalLikes}
                            </div>
                            <div className="text-sm text-white/60">
                                Total Likes
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Controls */}
                <Card className="mb-6 backdrop-blur-lg bg-white/10 border border-white/20">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    placeholder="Search confessions..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={
                                        filterType === "all"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setFilterType("all")}
                                    className={
                                        filterType === "all"
                                            ? "bg-violet-500 hover:bg-violet-600 text-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }
                                >
                                    All
                                </Button>
                                <Button
                                    variant={
                                        filterType === "hidden"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setFilterType("hidden")}
                                    className={
                                        filterType === "hidden"
                                            ? "bg-violet-500 hover:bg-violet-600 text-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }
                                >
                                    Hidden
                                </Button>
                                <Button
                                    variant={
                                        filterType === "reported"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setFilterType("reported")}
                                    className={
                                        filterType === "reported"
                                            ? "bg-violet-500 hover:bg-violet-600 text-white"
                                            : "text-white/80 hover:text-white hover:bg-white/10"
                                    }
                                >
                                    Reported
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Confessions List */}
                <div className="space-y-4">
                    {filteredConfessions.map((confession) => (
                        <Card
                            key={confession.id}
                            className={`backdrop-blur-lg border transition-all duration-300 ${
                                confession.isHidden
                                    ? "bg-red-500/10 border-red-500/30"
                                    : "bg-white/10 border-white/20 hover:bg-white/15"
                            }`}
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
                                                    {confession.timestamp}
                                                </span>
                                                {confession.isHidden && (
                                                    <Badge
                                                        variant="destructive"
                                                        className="text-xs"
                                                    >
                                                        Hidden
                                                    </Badge>
                                                )}
                                                {(confession.reportCount || 0) >
                                                    0 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-yellow-500/20 text-yellow-300 text-xs"
                                                    >
                                                        {confession.reportCount}{" "}
                                                        reports
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-white leading-relaxed break-words">
                                                {confession.content}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                                                <span>
                                                    {confession.likes} likes
                                                </span>
                                                <span>
                                                    {confession.replies} replies
                                                </span>
                                                <span>
                                                    {confession.views} views
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex lg:flex-col gap-2 lg:items-end">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleToggleVisibility(
                                                    confession.id
                                                )
                                            }
                                            className="text-white/80 hover:text-white hover:bg-white/10"
                                        >
                                            {confession.isHidden ? (
                                                <>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Show
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="w-4 h-4 mr-2" />
                                                    Hide
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteConfession(
                                                    confession.id
                                                )
                                            }
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredConfessions.length === 0 && (
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
