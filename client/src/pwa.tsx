"use client";

import { useEffect, useState } from "react";
import { InstallModal } from "@/components/install-modal";


export function PWA() {
    const [showInstallModal, setShowInstallModal] = useState(false);

    useEffect(() => {
        const UA = navigator.userAgent;
        const IOS = UA.match(/iPhone|iPad|iPod/);
        const ANDROID = UA.match(/Android/);
        const PLATFORM = IOS ? 'ios' : ANDROID ? 'android' : 'unknown';
        const standalone = window.matchMedia('(display-mode: standalone)').matches;
        const INSTALLED = !!(standalone || (IOS && !UA.match(/Safari/)));
        if (!INSTALLED) {
            setShowInstallModal(true);
        }
    }, []);

    return (
        <>
            {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} />}</>
    );
}
