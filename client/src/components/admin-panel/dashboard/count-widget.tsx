import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, TrendingUp } from 'lucide-react';

interface CountWidgetProps {
  amount: string | number;
  percentage: string | number;
  icon?: React.ReactNode;
  trendIcon?: React.ReactNode;
  className?: string;
}

export default function CountWidget({
  amount,
  percentage,
  icon = <UserPlus className="h-6 w-6 text-primary-foreground" />,
  trendIcon = <TrendingUp className="h-4 w-4 text-green-500" />,
  className = "w-full max-w-sm shadow-lg dark:shadow-none",
}: CountWidgetProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary rounded-full p-3">
            {icon}
          </div>
          <div>
            <div className="text-4xl font-bold">{amount}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {trendIcon}
              <span>{percentage}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
