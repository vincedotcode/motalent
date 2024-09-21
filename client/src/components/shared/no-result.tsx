import { AlertTriangle } from "lucide-react";

interface NoResultProps {
    title: string;
    description?: string;
}

const NoResult: React.FC<NoResultProps> = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <AlertTriangle className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{description}</p>}
        </div>
    );
};

export default NoResult;