import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white border border-blue-200 rounded-lg p-4 flex items-center justify-center">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex items-center justify-center"
                >
                    <BriefcaseBusiness className="h-12 w-12 " color="#3576DF" />
                </motion.div>
            </div>
        </div>
    );
};

export default Loader;
