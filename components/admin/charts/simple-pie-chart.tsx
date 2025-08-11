"use client";

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

interface SimplePieChartProps {
  data: DataItem[];
  size?: number;
  className?: string;
  showLabels?: boolean;
  showPercentages?: boolean;
}

const DEFAULT_COLORS = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e0b", 
  "#8b5cf6", "#06b6d4", "#f97316", "#84cc16"
];

export function SimplePieChart({ 
  data, 
  size = 200, 
  className = "",
  showLabels = true,
  showPercentages = true
}: SimplePieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center text-muted-foreground ${className}`}
        style={{ width: size, height: size }}
      >
        No data available
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  let accumulatedPercentage = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercentage * circumference / 100;
    const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    
    accumulatedPercentage += percentage;

    return {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset,
      color
    };
  });

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {/* Pie Chart */}
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {segments.map((segment, index) => (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={normalizedRadius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              strokeLinecap="round"
              className="hover:opacity-80 transition-opacity"
            />
          ))}
        </svg>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLabels && (
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="flex-1">{segment.label}</span>
              {showPercentages && (
                <span className="font-medium text-muted-foreground">
                  {segment.percentage.toFixed(1)}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}