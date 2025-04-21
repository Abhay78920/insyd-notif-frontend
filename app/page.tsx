import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-8 flex flex-col items-center space-y-4">
        <Building2 className="h-16 w-16 text-primary mb-2" />
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Insyd</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          A notification system designed for architecture professionals
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/trigger">Trigger Activities</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/notifications">View Notifications</Link>
        </Button>
      </div>
    </div>
  );
}