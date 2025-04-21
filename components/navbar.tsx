import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Insyd</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/trigger" className="text-foreground/80 hover:text-foreground transition-colors">
            Trigger
          </Link>
          <Link href="/notifications" className="text-foreground/80 hover:text-foreground transition-colors">
            Notifications
          </Link>
        </nav>
      </div>
    </header>
  );
}