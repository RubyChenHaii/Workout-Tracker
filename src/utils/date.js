// 回傳今天的 "YYYY-MM-DD" 字串
export const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

// 把 "YYYY-MM-DD" 字串轉成本地時間的 Date，避免時區偏移問題
export const localDate = (s) => new Date(s + "T00:00:00");

// 產生唯一 ID，優先使用 crypto.randomUUID() 避免碰撞
export const uid = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "x" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
};

// 將日期字串格式化為「今天／昨天／月/日」，支援中英文
export const fmtDate = (s, lang = "zh") => {
  const d = localDate(s);
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const y = new Date(t); y.setDate(t.getDate() - 1);
  const dt = localDate(s); dt.setHours(0, 0, 0, 0);
  if (dt.getTime() === t.getTime()) return lang === "en" ? "Today" : "今天";
  if (dt.getTime() === y.getTime()) return lang === "en" ? "Yesterday" : "昨天";
  return `${d.getMonth()+1}/${d.getDate()}`;
};
