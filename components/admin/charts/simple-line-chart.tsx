"use client";

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  showPoints?: boolean;
  color?: string;
  strokeWidth?: number;
}

export function SimpleLineChart({ 
  data, 
  height = 300, 
  className = "", 
  showPoints = true,
  color = "#3b82f6",
  strokeWidth = 2
}: SimpleLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center text-muted-foreground ${className}`}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const padding = 60;
  const chartWidth = 100;
  const chartHeight = height - padding;
  const valueRange = maxValue - minValue;

  // Generate path for line
  const pathData = data.map((item, index) => {
    const x = 15 + (index * (chartWidth - 30)) / (data.length - 1);
    const y = padding / 2 + chartHeight - ((item.value - minValue) / valueRange) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <g key={index}>
            <line
              x1="10"
              y1={padding / 2 + chartHeight * ratio}
              x2="90"
              y2={padding / 2 + chartHeight * ratio}
              stroke="#e5e7eb"
              strokeWidth="0.2"
            />
            <text
              x="8"
              y={padding / 2 + chartHeight * ratio + 1}
              fontSize="3"
              fill="#6b7280"
              textAnchor="end"
            >
              {Math.round(((maxValue - minValue) * (1 - ratio) + minValue) / 1000000)}M
            </text>
          </g>
        ))}

        {/* Area fill */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <path
          d={`${pathData} L ${15 + ((data.length - 1) * (chartWidth - 30)) / (data.length - 1)} ${padding / 2 + chartHeight} L 15 ${padding / 2 + chartHeight} Z`}
          fill="url(#areaGradient)"
        />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth / 10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {showPoints && data.map((item, index) => {
          const x = 15 + (index * (chartWidth - 30)) / (data.length - 1);
          const y = padding / 2 + chartHeight - ((item.value - minValue) / valueRange) * chartHeight;

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="1.5"
                fill={color}
                stroke="white"
                strokeWidth="0.5"
                className="hover:r-2 transition-all"
              />
              
              {/* Value label */}
              <text
                x={x}
                y={y - 3}
                fontSize="2.5"
                fill="#374151"
                textAnchor="middle"
                fontWeight="500"
              >
                {(item.value / 1000000).toFixed(1)}M
              </text>
              
              {/* X-axis label */}
              <text
                x={x}
                y={height - 5}
                fontSize="3"
                fill="#6b7280"
                textAnchor="middle"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}