"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Eye,
    EyeOff,
    Menu,
    X,
    MessageCircle,
    Lock,
    Coins,
    Sparkles,
    Router,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { set } from "mongoose";
import { useRouter } from "next/navigation";

export default function ConfessLanding() {
    const [showPassword, setShowPassword] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentConfession, setCurrentConfession] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [roomPassword, setRoomPassword] = useState("");

    const [currentRoom, setCurrentRoom] = useState({
        name: roomName,
        description: roomDescription,
        password: roomPassword,
    });

    const confessions = [
        "I've been pretending to like my best friend's cooking for 3 years... 😅",
        "I still sleep with a nightlight and I'm 25 years old. ✨",
        "I've never actually read any of the books I claim are my favorites. 📚",
        "I talk to my plants and genuinely believe they understand me. 🌱",
        "I practice acceptance speeches in the mirror for awards I'll never win. 🏆",
    ];

    const features = [
        {
            icon: MessageCircle,
            title: "Anonymous Messages",
            description:
                "Receive completely anonymous confessions from anyone with your room link.",
        },
        {
            icon: Lock,
            title: "Password-Protected Room",
            description:
                "Keep your confession space secure with custom password protection.",
        },
        {
            icon: Coins,
            title: "Treasury of Confessions",
            description:
                "Collect and organize all confessions in your personal digital vault.",
        },
    ];

    const handleCreateRoom = async (
        name: string,
        description: string,
        password: string
    ) => {
        console.log("Room Created:", { name, description, password });

        try {
            const res = await fetch("/api/createRoom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim(),
                    password,
                }),
            });

            if (res.status !== 201) {
                const errorData = await res.json();
                console.error("Error creating room:", errorData);
                return;
            }

            const data = await res.json();
            console.log("Room created successfully:", data);

            setCurrentRoom({
                name: data.room.name,
                description: data.room.description,
                password: data.room.password,
            });

            router.push(`/room/${data.room._id}`);
        } catch (error) {
            console.error("Error creating room:", error);
        }

        setRoomName("");
        setRoomDescription("");
        setRoomPassword("");
    };

    return (
        <div className="min-h-screen transition-all duration-500">
            <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-violet-900">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/25 to-purple-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-rose-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-fuchsia-400/15 to-pink-400/15 rounded-full blur-2xl animate-bounce delay-2000"></div>
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-2xl animate-bounce delay-3000"></div>
                </div>

                {/* Header */}
                <header className="relative z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/25">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent font-mono">
                                    confess.io ✨
                                </span>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-4">
                                <Dialog
                                    open={dialogOpen}
                                    onOpenChange={setDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                                            Create Room
                                        </Button>
                                    </DialogTrigger>
                                </Dialog>
                            </div>

                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden text-white"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-lg border-b border-white/20">
                            <Dialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border border-pink-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                                        Create Room
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    )}
                </header>

                {/* Hero Section */}
                <section className="relative z-10 container mx-auto px-4 py-12 md:py-24 lg:py-32 text-center">
                    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                        <div className="space-y-4 md:space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 backdrop-blur-sm mb-4 md:mb-6">
                                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-pink-400" />
                                <span className="text-pink-200 text-xs md:text-sm font-medium">
                                    Anonymous Confessions Made Easy
                                </span>
                                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-violet-400" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight px-2">
                                Create a Space.{" "}
                                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent animate-pulse">
                                    Get Confessions.
                                </span>{" "}
                                <br className="hidden sm:block" />
                                Stay Anonymous.
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
                                Confess.io lets you create a cute,
                                password-protected room to receive anonymous
                                messages from anyone.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col items-center space-y-4 md:space-y-6 pt-4 md:pt-8 px-4">
                            <Dialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto relative bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 hover:from-pink-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold px-8 sm:px-12 py-4 md:py-6 text-md md:text-xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105 rounded-2xl border border-pink-400/30 group overflow-hidden max-w-sm"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        Create Your Magical Room
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[92%] backdrop-blur-lg bg-gradient-to-br from-white/10 to-pink-500/10 border border-pink-300/30 text-white max-w-sm sm:max-w-sm shadow-2xl shadow-pink-500/20 rounded-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent text-center">
                                            Create Your Magical Room
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 md:space-y-6 pt-4 md:pt-6">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleCreateRoom(
                                                    roomName,
                                                    roomDescription,
                                                    roomPassword
                                                );
                                                setDialogOpen(false);
                                            }}
                                            className="space-y-4 md:space-y-6"
                                        >
                                            <Input
                                                placeholder="Room Name (e.g., Secret Garden)"
                                                className="bg-white/10 border-pink-300/30 text-white placeholder:text-white/60 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 rounded-xl h-11 md:h-12 transition-all duration-300"
                                                value={roomName}
                                                onChange={(e) =>
                                                    setRoomName(e.target.value)
                                                }
                                            />
                                            <Input
                                                placeholder="Description (e.g., Share your secrets)"
                                                className="bg-white/10 border-pink-300/30 text-white placeholder:text-white/60 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 rounded-xl h-11 md:h-12 transition-all duration-300"
                                                value={roomDescription}
                                                onChange={(e) =>
                                                    setRoomDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Password (keep it cool!)"
                                                    className="bg-white/10 border-pink-300/30 text-white placeholder:text-white/60 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 pr-12 rounded-xl h-11 md:h-12 transition-all duration-300"
                                                    value={roomPassword}
                                                    onChange={(e) =>
                                                        setRoomPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-300 hover:text-pink-200 hover:bg-pink-500/20 rounded-lg transition-all duration-300"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            <Button
                                                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 hover:from-pink-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold py-3 md:py-4 shadow-xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-105 rounded-xl border border-pink-400/30 group relative overflow-hidden"
                                                onClick={() =>
                                                    setDialogOpen(false)
                                                }
                                                type="submit"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                Create My Room
                                            </Button>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Trust indicators */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-white/70 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>100% Anonymous</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                                    <span>Secure & Private</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                                    <span>No Registration Required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 backdrop-blur-sm mb-4 md:mb-6">
                                <span className="text-pink-200 text-xs md:text-sm font-medium">
                                    ✨ Why You'll Love It ✨
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
                                Why Choose{" "}
                                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                                    Confess.io?
                                </span>
                            </h2>
                            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto px-4">
                                The cutest and safest way to collect anonymous
                                thoughts and confessions 💕
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="group backdrop-blur-lg bg-gradient-to-br from-white/10 to-pink-500/5 border border-pink-300/20 hover:bg-gradient-to-br hover:from-pink-500/10 hover:to-violet-500/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 rounded-2xl overflow-hidden"
                                >
                                    <CardContent className="p-6 md:p-8 text-center space-y-4 md:space-y-6 relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/25 group-hover:shadow-pink-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                            <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Demo Section */}
                <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-12 md:mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 backdrop-blur-sm mb-4 md:mb-6">
                                <span className="text-pink-200 text-xs md:text-sm font-medium">
                                    💕 Live Preview 💕
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
                                See the{" "}
                                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                                    Magic
                                </span>{" "}
                                in Action ✨
                            </h2>
                        </div>

                        <div className="relative max-w-xs sm:max-w-sm mx-auto">
                            {/* Phone Mockup */}
                            <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/15 to-pink-500/10 border border-pink-300/30 rounded-3xl p-4 md:p-6 shadow-2xl shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-500 hover:scale-105">
                                <div className="bg-gradient-to-br from-black/20 to-purple-900/30 rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="secondary"
                                            className="bg-gradient-to-r from-pink-500/30 to-violet-500/30 text-white border border-pink-400/30 px-2 py-1 md:px-3 rounded-full text-xs"
                                        >
                                            ✨ Anonymous
                                        </Badge>
                                        <span className="text-white/60 text-xs md:text-sm flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            Just now
                                        </span>
                                    </div>
                                    <div className="bg-gradient-to-br from-white/15 to-pink-500/10 rounded-xl p-4 md:p-5 border border-pink-300/20">
                                        <p className="text-white text-sm md:text-base leading-relaxed">
                                            {confessions[currentConfession]}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Confession Carousel */}
                            <div className="flex justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
                                {confessions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentConfession(index)
                                        }
                                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                            index === currentConfession
                                                ? "bg-gradient-to-r from-pink-400 to-violet-400 shadow-lg shadow-pink-400/50"
                                                : "bg-white/30 hover:bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 backdrop-blur-lg bg-gradient-to-r from-white/5 to-pink-500/5 border-t border-pink-300/20">
                    <div className="container mx-auto px-4 py-8 md:py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/25">
                                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <span className="text-white/80 font-mono text-base md:text-lg">
                                    confess.io ✨
                                </span>
                            </div>

                            <div className="flex items-center space-x-6 md:space-x-8 text-sm text-white/60">
                                <a
                                    href="#"
                                    className="hover:text-pink-300 transition-colors duration-300 hover:scale-105"
                                >
                                    About 💕
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-pink-300 transition-colors duration-300 hover:scale-105"
                                >
                                    Contact ✉️
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-pink-300 transition-colors duration-300 hover:scale-105"
                                >
                                    Twitter 🐦
                                </a>
                            </div>
                        </div>

                        <div className="text-center mt-6 md:mt-8 pt-6 md:pt-8 border-t border-pink-300/10">
                            <p className="text-white/60 text-sm">
                                Your secrets are safe. Express without judgment.
                                💕✨
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
