import React, { useEffect, useRef, createElement } from 'react';
interface TradingViewChartProps {
  symbol: string;
}
const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol
}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!symbol) return;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof TradingView !== 'undefined' && container.current) {
        new TradingView.widget({
          width: '100%',
          height: 500,
          symbol: symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: container.current.id
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [symbol]);
  return <div id="tradingview_chart" ref={container} className="w-full h-[500px]" />;
};
export default TradingViewChart;