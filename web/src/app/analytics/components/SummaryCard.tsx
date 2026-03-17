import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  variant?: "default" | "success" | "danger" | "warning";
  icon?: React.ReactNode;
}

export function SummaryCard({
  title,
  value,
  subtitle,
  trend,
  variant = "default",
  icon,
}: SummaryCardProps) {
  const variantStyles = {
    default: "bg-card border-border/50",
    success: "bg-success/5 border-success/20",
    danger: "bg-destructive/5 border-destructive/20",
    warning: "bg-warning/5 border-warning/20",
  };

  const valueColors = {
    default: "text-foreground",
    success: "text-success",
    danger: "text-destructive",
    warning: "text-warning",
  };

  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className={cn("border shadow-sm", variantStyles[variant])}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {icon && <span className="text-lg">{icon}</span>}
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <p className={cn("text-2xl font-bold font-display", valueColors[variant])}>
              {typeof value === "number" && value > 1000
                ? value.toLocaleString()
                : value}
            </p>
            <div className="flex items-center gap-2">
              {trend && (
                <span className={cn("text-xs font-medium", trendColors[trend.direction])}>
                  {trend.direction === "up" && "+"}
                  {trend.value}
                </span>
              )}
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          {trend && (
            <div
              className={cn(
                "rounded-full p-1.5",
                trend.direction === "up" && "bg-success/10 text-success",
                trend.direction === "down" && "bg-destructive/10 text-destructive",
                trend.direction === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {trend.direction === "up" && <TrendingUp className="h-4 w-4" />}
              {trend.direction === "down" && <TrendingDown className="h-4 w-4" />}
              {trend.direction === "neutral" && <Minus className="h-4 w-4" />}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
