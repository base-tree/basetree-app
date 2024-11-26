import { checkGradientBrightness } from '@/core/utils';
import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbols?: string[][]; // Array of symbol arrays, e.g., [["COINBASE:BTCUSD|1D"]]
  width?: string | number;
  height?: string | number;
  colorTheme?: 'dark' | 'light';
  //chartType?: 'area' | 'bars' | 'line' | 'candles';
  changeMode?: 'price-and-percent' | 'price-only' | 'percent-only' | 'no-values';
  backgroundColor?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbols = [["COINBASE:BTCUSD|1D"],["COINBASE:ETHUSD|1D"]],
  width = "100%",
  height = 300,
  colorTheme = "dark",
  changeMode = "price-and-percent",
  backgroundColor = "rgba(0, 0, 0, 1)"
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: symbols,
        chartOnly: false,
        width: width,
        height: height,
        locale: "en",
        colorTheme: checkGradientBrightness(backgroundColor),
        autosize: false,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        changeMode: changeMode,
        chartType: 'area',
        maLineColor: "#2962FF",
        maLineWidth: 1,
        maLength: 9,
        headerFontSize: "medium",
        backgroundColor: backgroundColor,
        lineWidth: 2,
        lineType: 0,
        dateRanges: [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      });
      container.current.appendChild(script);
    }
  }, [symbols, width, height, colorTheme, changeMode, backgroundColor]);

  return (
    <div className={`tradingview-widget-container ${symbols.toString().replaceAll(":","-")}`} ref={container}>
      <div className={`tradingview-widget-container__widget ${symbols.toString().replaceAll(":","-")}`}></div>
      
    </div>
  );
};

export default memo(TradingViewWidget);