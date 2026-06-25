<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/analytics");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F39A00]" />
        </div>
    );
=======
export default function AdminPage() {
  return <div>Admin</div>;
>>>>>>> 764c305853999c314cc80ab46a510043b8848d49
}
