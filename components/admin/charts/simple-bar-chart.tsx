"use client";

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  showValues?: boolean;
  color?: string;
}

export function SimpleBarChart({ 
  data, 
  height = 300, 
  className = "", 
  showValues = true,
  color = "#f59e0b" 
}: SimpleBarChartProps) {
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
  const barWidth = 100 / data.length;
  const padding = 60;
  const chartWidth = 100;
  const chartHeight = height - padding;

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
              {Math.round((maxValue * (1 - ratio)) / 1000000)}M
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = 15 + (index * (chartWidth - 30)) / data.length;
          const y = padding / 2 + chartHeight - barHeight;
          const width = (chartWidth - 30) / data.length - 2;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={width}
                height={barHeight}
                fill={color}
                rx="1"
                className="hover:opacity-80 transition-opacity"
              />
              
              {/* Value label */}
              {showValues && (
                <text
                  x={x + width / 2}
                  y={y - 1}
                  fontSize="2.5"
                  fill="#374151"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {(item.value / 1000000).toFixed(1)}M
                </text>
              )}
              
              {/* X-axis label */}
              <text
                x={x + width / 2}
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