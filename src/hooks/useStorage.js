// localStorage 讀取
export function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch(e) {
    return fallback;
  }
}

// localStorage 寫入
// 用 setTimeout 讓寫入在畫面渲染完成後才執行，避免阻塞主執行緒導致 UI freeze
export function lsSet(key, value) {
  setTimeout(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch(e) { console.warn("localStorage write failed:", e); }
  }, 0);
}
