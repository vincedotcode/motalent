
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AIRecruiterChat from "@/components/chat/ai-chat";
import { ChevronLeft } from "lucide-react";
import { ModeToggle } from "@/helper/darkmode";
import Navbar from "@/components/navbar";
export default function Home() {
    return (
        <>
           
<Navbar />
                <AIRecruiterChat />
         

            <Footer />
        </>

    );
}
