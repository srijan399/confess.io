// import { useContext, createContext, useState } from "react";

// interface RoomType {
//     name: string;
//     description: string;
//     password: string;
// }

// interface AuthContextType {
//     roomDetails: RoomType;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuthContext = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuthContext must be used within an AuthProvider");
//     }
//     return context;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// }
