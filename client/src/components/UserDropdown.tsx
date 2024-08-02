import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { getUserData, clearUserData } from '@/hooks/useAuth';

const UserDropdown = () => {
    const router = useRouter();
    const user = getUserData();

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    const handleLogout = () => {
        clearUserData();
        window.location.reload()
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background shadow-lg rounded-md p-1">
                <DropdownMenuLabel className="px-2 py-1">My Account</DropdownMenuLabel>
                {user?.role === 'admin' && (
                    <>
                        <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100 hover:text-slate-800" onClick={() => handleNavigate('/admin')}>
                            Admin
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100 hover:text-slate-800" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
