"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
    // MessageSquare,
    Sparkles,
    Lock,
    Copy,
    Check,
    ArrowLeft,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Room } from "@/app/_models/schema";
// import connectToDatabase from "@/lib/db";

export default function RoomPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = React.use(params);
    const [confession, setConfession] = useState("");
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);

    const [adminPassword, setAdminPassword] = useState("");

    const [, setPasswordError] = useState("");

    const [roomName, _setRoomName] = useState("Secrets");
    const [, _setLoading] = useState(true);
    const [error, setError] = useState("");

    const roomUrl = `confess.io/room/${resolvedParams.id}`;

    const handleAdminAccess = async () => {
        try {
            const res = await fetch(`/api/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomId: resolvedParams.id,
                    password: adminPassword,
                }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/room/${resolvedParams.id}/admin`);
            } else {
                setPasswordError("Invalid password");
            }
        } catch (error) {
            setPasswordError("Failed to check password");
            console.error("Error checking password:", error);
        } finally {
            setShowPasswordDialog(false);
            setAdminPassword("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confession.trim()) return;

        setIsSubmitting(true);
        setError("");

        console.log(
            "Submitting confession:",
            resolvedParams.id,
            confession.trim()
        );

        try {
            const response = await fetch(`/api/confess`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomId: resolvedParams.id,
                    content: confession.trim(),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setConfession("");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                setError(data.error || "Failed to submit confession");
            }
        } catch (err) {
            setError("Failed to submit confession. Please try again.");
            console.error("Error submitting confession:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyRoomUrl = () => {
        navigator.clipboard.writeText(roomUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                _setLoading(true);
                const response = await fetch(
                    `/api/getConfessions?roomId=${resolvedParams.id}`
                );
                const data = await response.json();

                if (data.success) {
                    _setRoomName(data.room.name);
                } else {
                    setError(data.error || "Failed to load room data");
                }
            } catch (err) {
                setError("Failed to load room data. Please try again.");
                console.error("Error fetching room data:", err);
            } finally {
                _setLoading(false);
            }
        };

        fetchRoomData();
    }, [resolvedParams.id]);

    return (
        <div className={`min-h-screen transition-all duration-500`}>
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
                            <div className="flex items-center justify-between space-x-6">
                                <Link href="/" className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white/80 hover:text-white hover:bg-white/10"
                                    >
                                        <ArrowLeft className="w-3 h-4" />
                                        Back
                                    </Button>
                                </Link>
                                <div className="flex items-center justify-between space-x-2">
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
                                                    }}
                                                    className="w-full"
                                                />
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
                                </div>
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
                        </CardContent>
                    </Card>

                    {/* Confession Form */}
                    <Card className="mb-6 sm:mb-8 backdrop-blur-lg bg-white/10 border border-white/20">
                        <CardContent className="p-4 sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Textarea
                                        value={confession}
                                        onChange={(e) =>
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

                            {/* Error Message */}
                            {error && (
                                <div className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                                    <span className="text-red-400 font-medium text-sm sm:text-base">
                                        {error}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
