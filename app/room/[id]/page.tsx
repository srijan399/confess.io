"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    MessageCircle,
    Send,
    Heart,
    MessageSquare,
    Eye,
    Sparkles,
    Lock,
    Copy,
    Check,
    Moon,
    Sun,
    ArrowLeft,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Confession {
    id: string;
    content: string;
    timestamp: string;
    likes: number;
    replies: number;
    views: number;
    isLiked: boolean;
}

export default function RoomPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [confession, setConfession] = useState("");
    const [isDark, setIsDark] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
        },
    ]);

    const roomName = "Anonymous Thoughts";
    const roomUrl = `confess.io/room/${params.id}`;
    const ADMIN_PASSWORD = "admin123"; // In a real app, this would be stored securely

    const handleAdminAccess = () => {
        if (adminPassword === ADMIN_PASSWORD) {
            router.push(`/room/${params.id}/admin`);
        } else {
            setPasswordError("Invalid password");
            setTimeout(() => setPasswordError(""), 3000);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confession.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const newConfession: Confession = {
            id: Date.now().toString(),
            content: confession,
            timestamp: "Just now",
            likes: 0,
            replies: 0,
            views: 1,
            isLiked: false,
        };

        setConfessions((prev) => [newConfession, ...prev]);
        setConfession("");
        setIsSubmitting(false);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleLike = (id: string) => {
        setConfessions((prev) =>
            prev.map((conf) =>
                conf.id === id
                    ? {
                          ...conf,
                          likes: conf.isLiked ? conf.likes - 1 : conf.likes + 1,
                          isLiked: !conf.isLiked,
                      }
                    : conf
            )
        );
    };

    const copyRoomUrl = () => {
        navigator.clipboard.writeText(roomUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        <div
            className={`min-h-screen transition-all duration-500 ${
                isDark ? "dark" : ""
            }`}
        >
            <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-cyan-900 dark:from-violet-950 dark:via-purple-950 dark:to-cyan-950">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                {/* Header */}
                <header className="relative z-50 backdrop-blur-lg bg-white/10 dark:bg-black/10 border-b border-white/20">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/80 hover:text-white hover:bg-white/10"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-white">
                                            {roomName}
                                        </h1>
                                        <p className="text-xs text-white/60">
                                            Anonymous Room
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Dialog
                                    open={showPasswordDialog}
                                    onOpenChange={setShowPasswordDialog}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-white/80 hover:text-white hover:bg-white/10"
                                        >
                                            <Shield className="w-4 h-4 mr-2" />
                                            <span className="hidden sm:inline">
                                                Treasury
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md bg-white/95 dark:bg-black/95 backdrop-blur-lg border border-white/20">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">
                                                Access Treasury
                                            </DialogTitle>
                                            <DialogDescription className="text-center">
                                                Enter the room password to
                                                access the admin dashboard
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Input
                                                type="password"
                                                placeholder="Enter room password"
                                                value={adminPassword}
                                                onChange={(e) => {
                                                    setAdminPassword(
                                                        e.target.value
                                                    );
                                                    setPasswordError("");
                                                }}
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleAdminAccess();
                                                    }
                                                }}
                                                className="w-full"
                                            />
                                            {passwordError && (
                                                <p className="text-red-500 text-sm text-center">
                                                    {passwordError}
                                                </p>
                                            )}
                                        </div>
                                        <DialogFooter className="flex justify-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                onClick={() => {
                                                    setShowPasswordDialog(
                                                        false
                                                    );
                                                    setAdminPassword("");
                                                    setPasswordError("");
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleAdminAccess}
                                                className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600"
                                            >
                                                Access
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsDark(!isDark)}
                                    className="text-white/80 hover:text-white hover:bg-white/10"
                                >
                                    {isDark ? (
                                        <Sun className="w-4 h-4" />
                                    ) : (
                                        <Moon className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyRoomUrl}
                                    className="text-white/80 hover:text-white hover:bg-white/10"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
                    {/* Room Info */}
                    <Card className="mb-6 sm:mb-8 backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 sm:p-6 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                {roomName}
                            </h2>
                            <p className="text-sm sm:text-base text-white/70 mb-4">
                                Share your thoughts anonymously. No judgments,
                                just honest conversations.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-white/60">
                                <span>Room URL:</span>
                                <code className="bg-white/10 px-2 py-1 rounded text-white/80 break-all">
                                    {roomUrl}
                                </code>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Confession Form */}
                    <Card className="mb-6 sm:mb-8 backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Textarea
                                        value={confession}
                                        onChange={(e: any) =>
                                            setConfession(e.target.value)
                                        }
                                        placeholder="Share your confessions, feedback, gossip, anything... Type your thoughts here and let them out anonymously."
                                        className="min-h-[100px] sm:min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-violet-400 resize-none text-sm sm:text-base"
                                        maxLength={500}
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-white/50">
                                        {confession.length}/500
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-white/60">
                                        <Lock className="w-4 h-4" />
                                        <span>100% Anonymous</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={
                                            !confession.trim() || isSubmitting
                                        }
                                        className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold px-4 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                <span className="hidden sm:inline">
                                                    Send Anonymously
                                                </span>
                                                <span className="sm:hidden">
                                                    Send
                                                </span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>

                            {/* Success Message */}
                            {showSuccess && (
                                <div className="mt-4 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-green-400 font-medium text-sm sm:text-base">
                                        Your confession has been shared
                                        anonymously!
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Confessions Feed */}
                    <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Recent Confessions
                        </h3>

                        {confessions.map((conf, index) => (
                            <Card
                                key={conf.id}
                                className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300"
                            >
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-start space-x-3 sm:space-x-4">
                                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                                            <AvatarFallback
                                                className={`${getRandomAvatar()} text-white`}
                                            >
                                                ?
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-white/20 text-white/80 text-xs"
                                                >
                                                    Anonymous
                                                </Badge>
                                                <span className="text-white/60 text-xs sm:text-sm">
                                                    {conf.timestamp}
                                                </span>
                                            </div>

                                            <p className="text-white leading-relaxed text-sm sm:text-base break-words">
                                                {conf.content}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleLike(conf.id)
                                                    }
                                                    className={`text-white/60 hover:text-white hover:bg-white/10 p-1 sm:p-2 ${
                                                        conf.isLiked
                                                            ? "text-red-400 hover:text-red-300"
                                                            : ""
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${
                                                            conf.isLiked
                                                                ? "fill-current"
                                                                : ""
                                                        }`}
                                                    />
                                                    <span className="text-xs sm:text-sm">
                                                        {conf.likes}
                                                    </span>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-white/60 hover:text-white hover:bg-white/10 p-1 sm:p-2"
                                                >
                                                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                    <span className="text-xs sm:text-sm">
                                                        {conf.replies}
                                                    </span>
                                                </Button>

                                                <div className="flex items-center text-white/60 text-xs sm:text-sm">
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                                    {conf.views}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-6 sm:mt-8">
                        <Button
                            variant="ghost"
                            className="text-white/80 hover:text-white hover:bg-white/10 text-sm sm:text-base"
                        >
                            Load More Confessions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
