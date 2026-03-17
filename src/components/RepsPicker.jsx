import { useRef, useEffect } from "react";
import { useC } from "../theme.js";

const ITEM_H  = 36;
const VISIBLE = 5;
const MIN     = 1;
const MAX     = 50;
const nums    = Array.from({ length: MAX - MIN + 1 }, (_, i) => i + MIN);

export function RepsPicker({ value, onChange }) {
  const C         = useC();
  const listRef   = useRef(null);
  const scrollTimer = useRef(null);
  const isScrolling = useRef(false);

  // 初始捲到正確位置
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = (value - MIN) * ITEM_H;
    // 元件卸載時清除 timer，避免記憶體洩漏
    return () => clearTimeout(scrollTimer.current);
  }, []); // eslint-disable-line

  // value 外部改變時同步捲動位置
  useEffect(() => {
    if (listRef.current && !isScrolling.current) {
      listRef.current.scrollTop = (value - MIN) * ITEM_H;
    }
  }, [value]); // eslint-disable-line

  const onScroll = () => {
    if (!listRef.current) return;
    isScrolling.current = true;
    // debounce：停止滾動後才觸發 onChange，避免每格都重新渲染
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!listRef.current) return;
      const idx     = Math.round(listRef.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(nums.length - 1, idx));
      // snap 到最近的格子
      listRef.current.scrollTo({ top: clamped * ITEM_H, behavior:"smooth" });
      setTimeout(() => {
        onChange(nums[clamped]);
        isScrolling.current = false;
      }, 150);
    }, 100);
  };

  return (
    <div style={{ position:"relative", width:52, height:ITEM_H*VISIBLE, overflow:"hidden", borderRadius:10, background:C.f5, border:`1.5px solid ${C.sep}`, flexShrink:0 }}>
      {/* 選中框 */}
      <div style={{ position:"absolute", top:"50%", left:0, right:0, height:ITEM_H, transform:"translateY(-50%)", background:`${C.blue}18`, borderTop:`1.5px solid ${C.blue}40`, borderBottom:`1.5px solid ${C.blue}40`, pointerEvents:"none", zIndex:2 }} />
      {/* 上下漸層遮罩 */}
      <div style={{ position:"absolute", top:0,    left:0, right:0, height:ITEM_H*1.5, background:`linear-gradient(to bottom,${C.f5},transparent)`, pointerEvents:"none", zIndex:2 }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:ITEM_H*1.5, background:`linear-gradient(to top,${C.f5},transparent)`,    pointerEvents:"none", zIndex:2 }} />
      {/* 滾動清單 */}
      <div ref={listRef} onScroll={onScroll}
        style={{ height:"100%", overflowY:"scroll", scrollbarWidth:"none", WebkitOverflowScrolling:"touch", paddingTop:ITEM_H*2, paddingBottom:ITEM_H*2 }}>
        <style>{`.reps-scroll::-webkit-scrollbar{display:none}`}</style>
        <div className="reps-scroll">
          {nums.map(n => (
            <div key={n} style={{ height:ITEM_H, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:n===value?17:14, fontWeight:n===value?700:400,
              color:n===value?C.blue:C.label, transition:"all 0.15s" }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
