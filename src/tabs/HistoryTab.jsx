import { useState } from "react";
import { useLang, T, MG_EN } from "../data/i18n.js";
import { WEEKDAYS, WEEKDAY_CN } from "../data/constants.js";
import { useC } from "../theme.js";
import { localDate } from "../utils/date.js";
import { Card } from "../components/ui.jsx";

export function HistoryTab({ workouts, library, onOpenDay }) {
  const lang = useLang(); const t = T[lang]; const C = useC();
  const [search, setSearch] = useState("");

  const filtered = workouts.filter(w => {
    if (!search) return true;
    const names = w.exercises.map(ex => { const it = library.find(l => l.id === ex.libId); return it ? it.name + (MG_EN[it.muscleGroup] || "") : ""; }).join("");
    return names.toLowerCase().includes(search.toLowerCase()) || w.muscleGroups.some(g => g.includes(search) || (MG_EN[g] || "").toLowerCase().includes(search.toLowerCase()));
  });

  const byDate = {};
  filtered.forEach(w => {
    if (!byDate[w.date]) byDate[w.date] = { date: w.date, weekday: w.weekday, workouts: [] };
    byDate[w.date].workouts.push(w);
  });
  const dates = Object.keys(byDate).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div style={{ flex:1, overflowY:"auto", background:C.bg }}>
      <div style={{ padding:"8px 20px 14px", background:C.card, borderBottom:`1px solid ${C.sep}` }}>
        <div style={{ fontSize:28, fontWeight:700, color:C.text, letterSpacing:-0.5, marginBottom:10 }}>{t.historyTitle}</div>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.label, fontSize:15 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.historySearch}
            style={{ width:"100%", background:C.bg, border:`1px solid ${C.sep}`, borderRadius:10, padding:"9px 12px 9px 36px", fontSize:15, color:C.text, boxSizing:"border-box", outline:"none", fontFamily:"inherit" }} />
        </div>
      </div>
      <div style={{ padding:"16px" }}>
        {dates.map(date => {
          const day = byDate[date];
          const d = localDate(date);
          const wdLabel = lang === "zh" ? WEEKDAY_CN[d.getDay()] : WEEKDAYS[d.getDay()].slice(0, 3);
          const allMGs = [...new Set(day.workouts.flatMap(w => w.muscleGroups))];
          const allExercises = day.workouts.flatMap(w => w.exercises);
          return (
            <Card key={date} style={{ marginBottom:12, cursor:"pointer" }}>
              <div onClick={() => onOpenDay(date)} style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:15, fontWeight:700, color:C.text }}>{d.getMonth() + 1}/{d.getDate()}</span>
                    <span style={{ fontSize:12, fontWeight:500, color:C.blue, background:`${C.blue}12`, borderRadius:6, padding:"2px 8px" }}>{wdLabel}</span>
                    {allMGs.map(mg => (
                      <span key={mg} style={{ fontSize:12, fontWeight:500, color:C.indigo, background:`${C.indigo}12`, borderRadius:6, padding:"2px 8px" }}>
                        {lang === "en" ? MG_EN[mg] || mg : mg}
                      </span>
                    ))}
                  </div>
                  <svg viewBox="0 0 24 24" fill={C.sep} width="14" height="14"><path d="M10 6l6 6-6 6V6z"/></svg>
                </div>
                {allExercises.map((ex, i) => {
                  const it = library.find(l => l.id === ex.libId);
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:3 }}>
                      {it && <div style={{ width:7, height:7, borderRadius:"50%", background:it.color, flexShrink:0, marginBottom:1 }} />}
                      <span style={{ fontSize:14, fontWeight:500, color:C.text, flexShrink:0 }}>{it ? it.name : (lang === "en" ? "(Deleted)" : "(已刪除)")}</span>
                      <span style={{ fontSize:12, color:C.label, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {ex.weightSets.map(ws => `${ws.weight} x${ws.reps.join("/")}${t.repsUnit}`).join("  ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
        {dates.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:C.label }}>
            <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
            <div style={{ fontSize:15, fontWeight:500 }}>{t.historyEmpty}</div>
          </div>
        )}
      </div>
    </div>
  );
}
