import React, { useState, useEffect, createContext, useContext } from "react";

// ══════════════════════════════════════════════════════════════
//  I18N
// ══════════════════════════════════════════════════════════════
const LangCtx = createContext("zh");
const useLang = () => useContext(LangCtx);

const T = {
  zh: {
    // Nav
    navHome:"主頁", navHistory:"歷史", navLog:"記錄", navLibrary:"動作庫", navAbout:"關於",
    // Home
    homeSubtitle:"健身日誌", homeTitle:"總覽",
    statWeekCount:"本週訓練次數", statLibCount:"動作庫收錄動作",
    sectionCalendar:"訓練日曆", sectionRecent:"最近紀錄",
    emptyRecent:"還沒有紀錄，點「記錄」開始吧！",
    btnStartToday:"＋ 開始今日訓練",
    // Calendar
    weekdays:["日","一","二","三","四","五","六"],
    // Log
    logSubtitle:"新增訓練", logMuscleLabel:"部位：",
    logCustomMuscle:"＋ 自訂部位", logCollapse:"收起",
    logEquipLabel:"器材設定", logEquipPlaceholder:"器材設定（如：臥推架高度5，保護槓最低格…）",
    logSetsLabel:"重量與組次",
    logKnowledgeLabel:"動作知識筆記", logKnowledgeSub:"儲存後自動同步至動作庫",
    logKnowledgeDirty:"已修改・將同步",
    logKnowledgePlaceholder:"姿勢提醒、器材心得…（儲存後同步至動作庫）",
    logFeelingLabel:"當次感受", logFeelingSub:"今天做這個動作的狀態（僅記錄在本次訓練）",
    logFeelingPlaceholder:"今天的狀態、感受…",
    logRemove:"移除", logAddExercise:"+ 從動作庫選擇", logSave:"完成訓練",
    logPickerTitle:"選擇動作", logPickerSearch:"搜尋動作名稱或部位…",
    logLastSeen:"上次",
    // History
    historyTitle:"訓練紀錄", historySearch:"搜尋動作或部位…",
    historyEmpty:"找不到相關紀錄",
    // Detail
    detailEquip:"器材設定", detailSets:"重量與組次",
    detailKnowledge:"動作知識筆記", detailKnowledgeSub:"長期積累・存於動作庫",
    detailFeeling:"當次感受", detailLibBtn:"動作庫 →",
    detailBack:"‹ 返回",
    detailEdit:"編輯紀錄", detailDelete:"刪除此紀錄",
    detailDeleteConfirm:"確定要刪除這筆訓練紀錄嗎？此動作無法復原。",
    detailSaveEdit:"儲存修改", detailCancelEdit:"取消",
    // Library list
    libSubtitle:"管理動作", libTitle:"動作庫",
    libAdd:"＋ 新增", libSearch:"搜尋動作名稱或部位…",
    libNoHistory:"尚無訓練紀錄", libRecords:"次紀錄 · 最近",
    libHasNote:"有筆記", libEmpty:"找不到相關動作",
    // Library item detail
    libItemEdit:"編輯", libItemDone:"完成",
    libItemEditTitle:"編輯動作資訊", libItemMuscle:"訓練部位",
    libItemColor:"顏色", libItemSave:"儲存", libItemDelete:"刪除動作",
    libNoteTitle:"動作知識筆記",
    libNoteSub:"姿勢提醒、器材設定心得、長期累積的know-how",
    libNotePlaceholder:"在這裡記錄這個動作的一切知識…",
    libNoteSave:"儲存筆記",
    libHistoryTitle:"訓練歷史", libHistoryEmpty:"尚無訓練紀錄",
    libEquip:"器材設定", libHistoryFeeling:"當次感受",
    libLastEquip:"上次器材設定", libLastSets:"上次重量組次",
    libLastEquipSub:"下次訓練時將自動代入", libLastSetsSub:"下次訓練時將自動代入",
    libLastEquipPlaceholder:"尚無器材設定紀錄",
    logEquipHint:"預設代入上次訓練資料", logSetsHint:"預設代入上次訓練資料",
    // Add item form
    addName:"動作名稱", addMuscle:"訓練部位", addColor:"顏色",
    addBtn:"新增動作", addCancel:"取消",
    // Weight editor
    weSets:"組次：", weAddSet:"+ 新增重量組",
    weightPlaceholder:"重量（如 15kg、自重）",
    // Misc
    times:"次", pieces:"個", totalReps:"共", repsUnit:"下",
    savedAlert:"✅ 已儲存！動作知識筆記已同步至動作庫。",
    atLeastOne:"請至少新增一個動作",
    langBtn:"EN",
    exportTitle:"資料匯出", exportSub:"將你的訓練紀錄和動作庫備份到本機",
    exportJSON:"匯出 JSON（完整備份）", exportCSV:"匯出 CSV（試算表）",
    exportJSONSub:"可用於未來還原資料", exportCSVSub:"可用 Excel 或 Numbers 開啟",
  },
  en: {
    navHome:"Home", navHistory:"History", navLog:"Log", navLibrary:"Library", navAbout:"About",
    homeSubtitle:"Workout Journal", homeTitle:"Overview",
    statWeekCount:"Workouts this week", statLibCount:"Exercises in library",
    sectionCalendar:"Training Calendar", sectionRecent:"Recent Workouts",
    emptyRecent:"No workouts yet. Tap \"Log\" to start!",
    btnStartToday:"＋ Start Today's Workout",
    weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    logSubtitle:"New Workout", logMuscleLabel:"Muscle:",
    logCustomMuscle:"＋ Custom", logCollapse:"Collapse",
    logEquipLabel:"Equipment Setup", logEquipPlaceholder:"Equipment setup (e.g. bench height 5, safety bar at lowest…)",
    logSetsLabel:"Weight & Sets",
    logKnowledgeLabel:"Knowledge Notes", logKnowledgeSub:"Saved to library on submit",
    logKnowledgeDirty:"Modified · Will sync",
    logKnowledgePlaceholder:"Form cues, equipment tips… (synced to library on save)",
    logFeelingLabel:"Session Feeling", logFeelingSub:"How did this exercise feel today? (session only)",
    logFeelingPlaceholder:"Today's state, feeling…",
    logRemove:"Remove", logAddExercise:"+ Pick from Library", logSave:"Finish Workout",
    logPickerTitle:"Select Exercise", logPickerSearch:"Search exercise or muscle…",
    logLastSeen:"Last",
    historyTitle:"Workout History", historySearch:"Search exercise or muscle…",
    historyEmpty:"No matching records",
    detailEquip:"Equipment Setup", detailSets:"Weight & Sets",
    detailKnowledge:"Knowledge Notes", detailKnowledgeSub:"Long-term · Stored in library",
    detailFeeling:"Session Feeling", detailLibBtn:"Library →",
    detailBack:"‹ Back",
    detailEdit:"Edit", detailDelete:"Delete Workout",
    detailDeleteConfirm:"Delete this workout? This cannot be undone.",
    detailSaveEdit:"Save Changes", detailCancelEdit:"Cancel",
    libSubtitle:"Manage Exercises", libTitle:"Exercise Library",
    libAdd:"＋ Add", libSearch:"Search exercise or muscle…",
    libNoHistory:"No workout history yet", libRecords:"sessions · Last",
    libHasNote:"Has notes", libEmpty:"No matching exercises",
    libItemEdit:"Edit", libItemDone:"Done",
    libItemEditTitle:"Edit Exercise", libItemMuscle:"Muscle Group",
    libItemColor:"Color", libItemSave:"Save", libItemDelete:"Delete",
    libNoteTitle:"Knowledge Notes",
    libNoteSub:"Form cues, equipment tips, long-term know-how",
    libNotePlaceholder:"Record everything you know about this exercise…",
    libNoteSave:"Save Notes",
    libHistoryTitle:"Training History", libHistoryEmpty:"No workout history yet",
    libEquip:"Equipment Setup", libHistoryFeeling:"Session Feeling",
    libLastEquip:"Last Equipment Setup", libLastSets:"Last Weight & Sets",
    libLastEquipSub:"Will be pre-filled next session", libLastSetsSub:"Will be pre-filled next session",
    libLastEquipPlaceholder:"No equipment record yet",
    logEquipHint:"Pre-filled from last session", logSetsHint:"Pre-filled from last session",
    addName:"Exercise name", addMuscle:"Muscle Group", addColor:"Color",
    addBtn:"Add Exercise", addCancel:"Cancel",
    weSets:"Sets:", weAddSet:"+ Add weight group",
    weightPlaceholder:"Weight (e.g. 15kg, bodyweight)",
    times:"", pieces:"", totalReps:"Total", repsUnit:"reps",
    savedAlert:"✅ Saved! Knowledge notes synced to library.",
    atLeastOne:"Please add at least one exercise.",
    langBtn:"中",
    exportTitle:"Export Data", exportSub:"Back up your workouts and exercise library",
    exportJSON:"Export JSON (Full Backup)", exportCSV:"Export CSV (Spreadsheet)",
    exportJSONSub:"Can be used to restore data later", exportCSVSub:"Open with Excel or Numbers",
  },
};

const MG_EN = {
  "胸肌":"Chest","背部":"Back","腿部":"Legs","肩部":"Shoulders",
  "二頭":"Biceps","三頭":"Triceps","腹部":"Abs","核心":"Core",
  "臀部":"Glutes","有氧":"Cardio","其他":"Other",
};
// MG_ZH reserved for future use
// const MG_ZH = Object.fromEntries(Object.entries(MG_EN).map(([z,e])=>[e,z]));

const COLOR_OPTS = [
  "#FF6B6B","#FF2D55","#FF9500","#FFCC00",
  "#34C759","#5AC8FA","#007AFF","#5856D6","#AF52DE","#8E8E93",
];
const MG_OPTIONS  = ["胸肌","背部","腿部","肩部","二頭","三頭","腹部","核心","臀部","有氧","其他"];
const WEEKDAYS    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const WEEKDAY_CN  = ["週日","週一","週二","週三","週四","週五","週六"];
const MONTHS_EN   = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const INIT_LIBRARY = [
  { id:"lib1", name:"抱槓片仰臥起坐", muscleGroup:"腹部", color:"#FF2D55",
    note:"開頭首先做，會比較有力氣。\n頂點停2-5秒，腰盡量向前挺（但不要挺直！）\n以不受傷為主！\n15kg 以每組5-10下，每組不超過10下。",
    history:[{ date:"2026-03-09", workoutId:1, equipment:"高度5，槓片貼上胸",
      weightSets:[{weight:"15kg",reps:[10,5,5]},{weight:"10kg",reps:[5,5]}],
      feeling:"狀態不錯，15kg 前幾組都很紮實，後來有點掉，改10kg 收尾。"}]},
  { id:"lib2", name:"臥推", muscleGroup:"胸肌", color:"#FF6B6B",
    note:"挺胸，肩胛骨往內收，核心收緊，背拱起。握槓時手向下扣，讓掌根承重而非手掌承重！\n下去儘量和胸肌平行，刺激效果才會高。\n坐定位時眼睛垂直看到槓，固定槓在眼睛高度，肩關節在固定槓下方。\n槓重30kg。",
    history:[{ date:"2026-03-09", workoutId:1, equipment:"臥推架準備槓高度：5上，保護槓在最低有效格\n活動式臥推椅：角度1-2",
      weightSets:[{weight:"15kg",reps:[4,3,3]},{weight:"10kg",reps:[5,4,3]}],
      feeling:"關節今天有點卡，發現舉不起來真的是關節問題不是胸肌無力。下次搭配關節活動度訓練試試。"}]},
  { id:"lib3", name:"引體向上", muscleGroup:"背部", color:"#34C759",
    note:"肩胛骨先往下沉再發力，不要聳肩。頂點停1秒。",
    history:[{ date:"2026-03-07", workoutId:2, equipment:"自重",
      weightSets:[{weight:"自重",reps:[8,7,6]}],
      feeling:"今天自重做起來比上週輕鬆，進步了！"}]},
  { id:"lib4", name:"硬舉", muscleGroup:"背部", color:"#34C759",
    note:"背要保持中立位，不要圓背！核心全程收緊。\n下放時控制速度，不要直接放。",
    history:[{ date:"2026-03-07", workoutId:2, equipment:"奧林匹克槓（槓重20kg）",
      weightSets:[{weight:"60kg",reps:[5,5,5]},{weight:"80kg",reps:[3,3]}],
      feeling:"80kg 第二組最後一下有點圓背，下次注意。整體還可以。"}]},
  { id:"lib5", name:"背下拉", muscleGroup:"背部", color:"#34C759",
    note:"48kg 追求5 reps × 2 sets。\n41kg 要多做一點，追求5 reps × 3 sets。",
    history:[{ date:"2026-02-23", workoutId:5, equipment:"背下拉／划船機器",
      weightSets:[{weight:"48kg",reps:[5,5]},{weight:"41kg",reps:[5,5,5]}],
      feeling:"48kg 都覺得很重，但組數達標了。41kg 較順。"}]},
  { id:"lib6", name:"深蹲", muscleGroup:"腿部", color:"#007AFF",
    note:"膝蓋對齊腳尖，不要內扣。背打直，看前方略上。",
    history:[{ date:"2026-03-04", workoutId:3, equipment:"深蹲架高度4，槓重20kg",
      weightSets:[{weight:"40kg",reps:[8,8,6]},{weight:"50kg",reps:[5,5]}],
      feeling:"50kg 下去有點抖，還需要加強核心穩定。"}]},
  { id:"lib7", name:"腿推", muscleGroup:"腿部", color:"#007AFF",
    note:"不要鎖死膝關節，保持微彎。",
    history:[{ date:"2026-03-04", workoutId:3, equipment:"腿推機，腳距肩寬",
      weightSets:[{weight:"80kg",reps:[12,10,10]}],
      feeling:"感覺還好，可以下次加重。"}]},
  { id:"lib8", name:"肩推", muscleGroup:"肩部", color:"#FF9500",
    note:"核心收緊，不要借腰。手肘微朝前。",
    history:[{ date:"2026-03-01", workoutId:4, equipment:"啞鈴，站姿",
      weightSets:[{weight:"12kg",reps:[10,8,8]}],
      feeling:"12kg 最後幾下很難，但姿勢都維持住了。"}]},
  { id:"lib9", name:"跑步機", muscleGroup:"有氧", color:"#5AC8FA",
    note:"純跑步距離至少2k，混合短走0.5k。總運動時長30分鐘。\n目標：速度至少4.5圈（每圈0.4k）持續在7.5。",
    history:[{ date:"2026-02-23", workoutId:5, equipment:"跑步機（新）",
      weightSets:[{weight:"速度6.5-7.5 坡度5",reps:[1]}],
      feeling:"本次未達到速度目標，跑了2.5k（跑走混合）。"}]},
  { id:"lib10", name:"二頭彎舉", muscleGroup:"二頭", color:"#AF52DE", note:"", history:[] },
  { id:"lib11", name:"三頭下壓", muscleGroup:"三頭", color:"#5856D6", note:"", history:[] },
  { id:"lib12", name:"側平舉",   muscleGroup:"肩部", color:"#FF9500",  note:"", history:[] },
  { id:"lib13", name:"自然跑姿", muscleGroup:"有氧", color:"#5AC8FA",
    note:"前足落地，使用極簡赤足鞋。\n對足弓、阿基里斯腱、小腿負擔高，需循序漸進。\n每次跑步份量至少2k，跑步時腳跟不落地！\n感受足弓像彈簧推進的感覺，和傳統跑鞋不同！",
    history:[{ date:"2026-03-15", workoutId:6, equipment:"體育場橡膠跑道（每圈400m）",
      weightSets:[{weight:"自重",reps:[1]}],
      feeling:"跑2圈+走1圈+跑2圈+走1圈+跑1圈。赤足跑感覺很不一樣，小腿有感。"}]},
  { id:"lib14", name:"蛙式游泳", muscleGroup:"有氧", color:"#5AC8FA",
    note:"每次游泳1.5～2小時，至少來回5趟。\n其中至少一次去＆一次回不能中途停下！",
    history:[{ date:"2026-03-15", workoutId:6, equipment:"游泳池（泳池長度25m）",
      weightSets:[{weight:"自重",reps:[1]}],
      feeling:"本次游了2小時，狀態不錯，完成至少一趟不停。"}]},
];

const INIT_WORKOUTS = [
  { id:6, date:"2026-03-15", weekday:"Sunday", muscleGroups:["有氧"],
    exercises:[
      { libId:"lib13", equipment:"體育場橡膠跑道（每圈400m）", weightSets:[{weight:"自重",reps:[1]}], feeling:"跑2圈+走1圈+跑2圈+走1圈+跑1圈。赤足跑感覺很不一樣，小腿有感。"},
      { libId:"lib14", equipment:"游泳池（泳池長度25m）",       weightSets:[{weight:"自重",reps:[1]}], feeling:"本次游了2小時，狀態不錯，完成至少一趟不停。"},
    ]},
  { id:1, date:"2026-03-09", weekday:"Monday",   muscleGroups:["腹部","胸肌"],
    exercises:[
      { libId:"lib1", equipment:"高度5，槓片貼上胸", weightSets:[{weight:"15kg",reps:[10,5,5]},{weight:"10kg",reps:[5,5]}], feeling:"狀態不錯，15kg 前幾組都很紮實，後來有點掉，改10kg 收尾。"},
      { libId:"lib2", equipment:"臥推架準備槓高度：5上，保護槓在最低有效格\n活動式臥推椅：角度1-2", weightSets:[{weight:"15kg",reps:[4,3,3]},{weight:"10kg",reps:[5,4,3]}], feeling:"關節今天有點卡，發現舉不起來真的是關節問題不是胸肌無力。下次搭配關節活動度訓練試試。"},
    ]},
  { id:2, date:"2026-03-07", weekday:"Saturday", muscleGroups:["背部","二頭"],
    exercises:[
      { libId:"lib3", equipment:"自重", weightSets:[{weight:"自重",reps:[8,7,6]}], feeling:"今天自重做起來比上週輕鬆，進步了！"},
      { libId:"lib4", equipment:"奧林匹克槓（槓重20kg）", weightSets:[{weight:"60kg",reps:[5,5,5]},{weight:"80kg",reps:[3,3]}], feeling:"80kg 第二組最後一下有點圓背，下次注意。整體還可以。"},
    ]},
  { id:3, date:"2026-03-04", weekday:"Tuesday",  muscleGroups:["腿部"],
    exercises:[
      { libId:"lib6", equipment:"深蹲架高度4，槓重20kg", weightSets:[{weight:"40kg",reps:[8,8,6]},{weight:"50kg",reps:[5,5]}], feeling:"50kg 下去有點抖，還需要加強核心穩定。"},
      { libId:"lib7", equipment:"腿推機，腳距肩寬", weightSets:[{weight:"80kg",reps:[12,10,10]}], feeling:"感覺還好，可以下次加重。"},
    ]},
  { id:4, date:"2026-03-01", weekday:"Sunday",   muscleGroups:["肩部","三頭"],
    exercises:[
      { libId:"lib8", equipment:"啞鈴，站姿", weightSets:[{weight:"12kg",reps:[10,8,8]}], feeling:"12kg 最後幾下很難，但姿勢都維持住了。"},
    ]},
  { id:5, date:"2026-02-23", weekday:"Monday",   muscleGroups:["腿部","背部"],
    exercises:[
      { libId:"lib9", equipment:"跑步機（新）", weightSets:[{weight:"速度6.5-7.5 坡度5",reps:[1]}], feeling:"本次未達到速度目標，跑了2.5k（跑走混合）。"},
      { libId:"lib5", equipment:"背下拉／划船機器", weightSets:[{weight:"48kg",reps:[5,5]},{weight:"41kg",reps:[5,5,5]}], feeling:"48kg 都覺得很重，但組數達標了。41kg 較順。"},
    ]},
];

// ── helpers ───────────────────────────────────────────────────
const todayStr=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
// 把 "YYYY-MM-DD" 字串轉成本地時間的 Date，避免時區偏移問題
const localDate=(s)=>new Date(s+"T00:00:00");
// #6 改用 crypto.randomUUID() 避免 ID 碰撞
const uid=()=>{
  if(typeof crypto!=="undefined"&&crypto.randomUUID) return crypto.randomUUID();
  return "x"+Math.random().toString(36).slice(2,9)+Date.now().toString(36);
};
// #3 fmtDate 支援語言參數
const fmtDate=(s,lang="zh")=>{
  const d=localDate(s),t=new Date(); t.setHours(0,0,0,0);
  const y=new Date(t); y.setDate(t.getDate()-1);
  const dt=localDate(s); dt.setHours(0,0,0,0);
  if(dt.getTime()===t.getTime()) return lang==="en"?"Today":"今天";
  if(dt.getTime()===y.getTime()) return lang==="en"?"Yesterday":"昨天";
  return `${d.getMonth()+1}/${d.getDate()}`;
};

// ── tokens ────────────────────────────────────────────────────
const LIGHT={bg:"#F2F2F7",card:"#FFFFFF",text:"#1C1C1E",sub:"#48484A",
  label:"#8E8E93",sep:"#E5E5EA",blue:"#007AFF",green:"#34C759",
  red:"#FF3B30",orange:"#FF9500",indigo:"#5856D6",
  f5:"rgba(0,0,0,0.05)",f3:"rgba(0,0,0,0.03)"};
const DARK={bg:"#1C1C1E",card:"#2C2C2E",text:"#F2F2F7",sub:"#EBEBF5",
  label:"#8E8E93",sep:"#3A3A3C",blue:"#0A84FF",green:"#30D158",
  red:"#FF453A",orange:"#FF9F0A",indigo:"#6E6CF0",
  f5:"rgba(255,255,255,0.08)",f3:"rgba(255,255,255,0.04)"};

const DarkCtx=createContext(false);
const useDark=()=>useContext(DarkCtx);
// 所有元件透過 useC() 取得當前主題色
const useC=()=>useContext(DarkCtx)?DARK:LIGHT;
// 全域 C 保留供少數靜態地方使用（會被覆蓋）
let C=LIGHT;

// ── micro ─────────────────────────────────────────────────────
function Div({left=0}){const C=useC();return <div style={{height:1,background:C.sep,marginLeft:left}}/>;}
function Card({children,style={}}){const C=useC();return <div style={{background:C.card,borderRadius:16,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.12)",...style}}>{children}</div>;}
function SLabel({children}){const C=useC();return <div style={{fontSize:12,fontWeight:500,color:C.label,letterSpacing:0.4,marginBottom:8,paddingLeft:2,textTransform:"uppercase"}}>{children}</div>;}

function StatusBar(){
  const C=useC();
  const [t,setT]=useState(new Date());
  useEffect(()=>{const i=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(i);},[]);
  const h=t.getHours().toString().padStart(2,"0"),m=t.getMinutes().toString().padStart(2,"0");
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 6px",fontSize:15,fontWeight:600,color:C.text,background:C.card,flexShrink:0,position:"relative"}}>
      <span>{h}:{m}</span>
      <div style={{position:"absolute",left:"50%",transform:"translateX(-50%)",width:120,height:34,background:"#000",borderRadius:20,zIndex:1}}/>
      <div style={{display:"flex",gap:5,alignItems:"center",fontSize:12}}><span>●●●</span><span>WiFi</span><span>🔋</span></div>
    </div>
  );
}

function BottomNav({tab,setTab}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const items=[
    {id:"home",    label:t.navHome,
      svg:(active)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={active?C.blue:C.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L12 4l9 8"/><path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9"/></svg>},
    {id:"history", label:t.navHistory,
      svg:(active)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={active?C.blue:C.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>},
    {id:"log",     label:t.navLog,
      svg:(active)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={active?C.blue:C.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>},
    {id:"library", label:t.navLibrary,
      svg:(active)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={active?C.blue:C.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V6a2 2 0 012-2h12a2 2 0 012 2v13"/><path d="M4 19a2 2 0 002 2h12a2 2 0 002-2"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></svg>},
    {id:"about",   label:t.navAbout,
      svg:(active)=><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={active?C.blue:C.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.5"/><line x1="12" y1="12" x2="12" y2="16"/></svg>},
  ];
  return(
    <div style={{display:"flex",background:C.card,borderTop:`1px solid ${C.sep}`,flexShrink:0}}>
      {items.map(item=>{
        const active=tab===item.id;
        return(
          <button key={item.id} onClick={()=>setTab(item.id)}
            style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,border:"none",background:"none",cursor:"pointer",padding:"10px 0 22px",position:"relative"}}>
            {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:2,borderRadius:1,background:C.blue}}/>}
            {item.svg(active)}
            <span style={{fontSize:10,fontWeight:active?600:400,color:active?C.blue:C.label,letterSpacing:0.2}}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════════════════════════
function Calendar({workouts,library,onDayClick}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const [vd,setVd]=useState(new Date());
  const yr=vd.getFullYear(),mo=vd.getMonth();
  const firstDay=new Date(yr,mo,1).getDay();
  const dim=new Date(yr,mo+1,0).getDate();
  const todStr=todayStr();
  const byDate={};
  workouts.forEach(w=>{
    if(!byDate[w.date]) byDate[w.date]={date:w.date,exercises:[]};
    byDate[w.date].exercises.push(...w.exercises);
  });
  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=dim;d++) cells.push(d);
  return(
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 10px"}}>
        <button onClick={()=>setVd(new Date(yr,mo-1,1))} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.blue,padding:"0 4px",lineHeight:1}}>‹</button>
        <span style={{fontSize:15,fontWeight:700,color:C.text}}>
          {lang==="zh" ? `${yr} 年 ${mo+1} 月` : `${MONTHS_EN[mo]} ${yr}`}
        </span>
        <button onClick={()=>setVd(new Date(yr,mo+1,1))} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.blue,padding:"0 4px",lineHeight:1}}>›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",padding:"0 10px 6px"}}>
        {t.weekdays.map((d,i)=>(
          <div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:i===0?C.red:i===6?`${C.blue}99`:C.label,padding:"2px 0"}}>{d}</div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",padding:"0 10px 14px",gap:"2px 0"}}>
        {cells.map((day,idx)=>{
          if(!day) return <div key={`_${idx}`}/>;
          const ds=`${yr}-${String(mo+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const w=byDate[ds];
          const isToday=ds===todStr;
          const dow=(firstDay+day-1)%7;
          return(
            <div key={day} onClick={()=>w&&onDayClick(ds)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 2px",cursor:w?"pointer":"default",borderRadius:10}}>
              <span style={{fontSize:13,fontWeight:isToday?700:400,width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",
                background:isToday?C.blue:"transparent",
                color:isToday?"#fff":dow===0?C.red:dow===6?`${C.blue}99`:C.text}}>
                {day}
              </span>
              {w&&(
                <div style={{display:"flex",gap:2,justifyContent:"center",flexWrap:"wrap",maxWidth:28}}>
                  {w.exercises.slice(0,3).map((ex,i)=>{
                    const it=library.find(l=>l.id===ex.libId);
                    return <div key={i} style={{width:5,height:5,borderRadius:"50%",background:it?it.color:C.blue}}/>;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════
//  HOME
// ═══════════════════════════════════════════════════════
function HomeTab({workouts,library,setTab,lang,setLang,darkMode,setDarkMode,openDayDetail}){
  const t=T[lang]; const C=useC();
  const now=new Date(),weekAgo=new Date(now); weekAgo.setDate(now.getDate()-7);
  const thisWeek=workouts.filter(w=>localDate(w.date)>=weekAgo);
  const recent=[...workouts].sort((a,b)=>localDate(b.date)-localDate(a.date)).slice(0,3);
  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"8px 20px 16px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:13,color:C.label,marginBottom:2}}>{t.homeSubtitle}</div>
          <div style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:-0.5}}>{t.homeTitle}</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:4}}>
          {/* Dark mode toggle */}
          <button onClick={()=>setDarkMode(d=>!d)}
            style={{background:C.f5,border:`1px solid ${C.sep}`,borderRadius:20,padding:"5px 12px",fontSize:15,cursor:"pointer"}}>
            {darkMode?"☀️":"🌙"}
          </button>
          {/* Language toggle */}
          <button onClick={()=>setLang(l=>l==="zh"?"en":"zh")}
            style={{background:C.f5,border:`1px solid ${C.sep}`,borderRadius:20,padding:"5px 14px",fontSize:13,fontWeight:600,color:C.sub,cursor:"pointer",letterSpacing:0.3}}>
            {t.langBtn}
          </button>
        </div>
      </div>
      <div style={{padding:"16px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <Card style={{padding:"14px 16px"}}><div style={{fontSize:26,fontWeight:700,color:C.text}}>{thisWeek.length}<span style={{fontSize:13,fontWeight:500,color:C.label}}> {t.times}</span></div><div style={{fontSize:12,color:C.label,marginTop:2}}>{t.statWeekCount}</div></Card>
          <Card style={{padding:"14px 16px"}}><div style={{fontSize:26,fontWeight:700,color:C.text}}>{library.length}<span style={{fontSize:13,fontWeight:500,color:C.label}}> {t.pieces}</span></div><div style={{fontSize:12,color:C.label,marginTop:2}}>{t.statLibCount}</div></Card>
        </div>
        <SLabel>{t.sectionCalendar}</SLabel>
        <Calendar workouts={workouts} library={library} onDayClick={date=>openDayDetail(date)}/>
        <SLabel>{t.sectionRecent}</SLabel>
        <Card style={{marginBottom:16}}>
          {recent.length===0&&<div style={{padding:"32px",textAlign:"center",color:C.label,fontSize:14}}>{t.emptyRecent}</div>}
          {recent.map((w,i)=>(
            <div key={w.id}>
              {i>0&&<Div left={20}/>}
              <div onClick={()=>openDayDetail(w.date)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <div style={{flexShrink:0}}><div style={{fontSize:11,fontWeight:600,color:C.blue,background:`${C.blue}15`,borderRadius:6,padding:"2px 8px"}}>
                  {lang==="zh" ? WEEKDAY_CN[WEEKDAYS.indexOf(w.weekday)] : w.weekday.slice(0,3)}
                </div></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:15,fontWeight:600,color:C.text}}>
                      {lang==="zh" ? w.muscleGroups.join("・") : w.muscleGroups.map(mg=>MG_EN[mg]||mg).join(" · ")}
                    </span>
                    <span style={{fontSize:12,color:C.label}}>{fmtDate(w.date,lang)}</span>
                  </div>
                  <div style={{fontSize:12,color:C.label}}>{w.exercises.map(ex=>{const it=library.find(l=>l.id===ex.libId);return it?it.name:(lang==="en"?"(Deleted)":"(已刪除)");}).join(lang==="zh"?"、":", ")}</div>
                </div>
                <svg viewBox="0 0 24 24" fill={C.sep} width="14" height="14"><path d="M10 6l6 6-6 6V6z"/></svg>
              </div>
            </div>
          ))}
        </Card>
        <button onClick={()=>setTab("log")} style={{width:"100%",padding:"16px",background:C.blue,border:"none",borderRadius:16,color:"#fff",fontSize:16,fontWeight:600,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,122,255,0.3)"}}>
          {t.btnStartToday}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  REPS PICKER  （iOS 滾輪風格）
// ═══════════════════════════════════════════════════════
function RepsPicker({value, onChange}){
  const C=useC();
  const ITEM_H=36, VISIBLE=5, MIN=1, MAX=50;
  const nums=Array.from({length:MAX-MIN+1},(_,i)=>i+MIN);
  const listRef=React.useRef(null);
  const scrollTimer=React.useRef(null);
  const isScrolling=React.useRef(false);

  // 初始捲到正確位置
  React.useEffect(()=>{
    if(listRef.current){
      listRef.current.scrollTop=(value-MIN)*ITEM_H;
    }
    // 元件卸載時清除 timer，避免記憶體洩漏
    return()=>clearTimeout(scrollTimer.current);
  },[]);// eslint-disable-line

  // value 外部改變時同步捲動位置
  React.useEffect(()=>{
    if(listRef.current&&!isScrolling.current){
      listRef.current.scrollTop=(value-MIN)*ITEM_H;
    }
  },[value]);// eslint-disable-line

  const onScroll=()=>{
    if(!listRef.current) return;
    isScrolling.current=true;
    // 用 debounce 避免每次滾動都觸發 onChange 和重新渲染
    clearTimeout(scrollTimer.current);
    scrollTimer.current=setTimeout(()=>{
      if(!listRef.current) return;
      const idx=Math.round(listRef.current.scrollTop/ITEM_H);
      const clamped=Math.max(0,Math.min(nums.length-1,idx));
      // snap 到最近的格子
      listRef.current.scrollTo({top:clamped*ITEM_H, behavior:"smooth"});
      // 只在停止滾動後才通知父元件
      setTimeout(()=>{
        onChange(nums[clamped]);
        isScrolling.current=false;
      }, 150);
    }, 100);
  };

  return(
    <div style={{position:"relative",width:52,height:ITEM_H*VISIBLE,overflow:"hidden",borderRadius:10,background:C.f5,border:`1.5px solid ${C.sep}`,flexShrink:0}}>
      {/* 選中框 */}
      <div style={{position:"absolute",top:"50%",left:0,right:0,height:ITEM_H,transform:"translateY(-50%)",background:`${C.blue}18`,borderTop:`1.5px solid ${C.blue}40`,borderBottom:`1.5px solid ${C.blue}40`,pointerEvents:"none",zIndex:2}}/>
      {/* 上下漸層遮罩 */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:ITEM_H*1.5,background:`linear-gradient(to bottom,${C.f5},transparent)`,pointerEvents:"none",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:ITEM_H*1.5,background:`linear-gradient(to top,${C.f5},transparent)`,pointerEvents:"none",zIndex:2}}/>
      {/* 滾動清單 */}
      <div ref={listRef}
        onScroll={onScroll}
        style={{height:"100%",overflowY:"scroll",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",
          paddingTop:ITEM_H*2, paddingBottom:ITEM_H*2}}>
        <style>{`.reps-scroll::-webkit-scrollbar{display:none}`}</style>
        <div className="reps-scroll">
          {nums.map(n=>(
            <div key={n} style={{height:ITEM_H,display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:n===value?17:14, fontWeight:n===value?700:400,
              color:n===value?C.blue:C.label, transition:"all 0.15s"}}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  WEIGHT-SET EDITOR
// ═══════════════════════════════════════════════════════
function WeightSetEditor({weightSets,onChange}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const upd=(wi,field,val)=>onChange(weightSets.map((ws,i)=>i===wi?{...ws,[field]:val}:ws));
  const updRep=(wi,ri,val)=>onChange(weightSets.map((ws,i)=>i===wi?{...ws,reps:ws.reps.map((r,j)=>j===ri?val:r)}:ws));
  const addRep=(wi)=>onChange(weightSets.map((ws,i)=>i===wi?{...ws,reps:[...ws.reps,ws.reps[ws.reps.length-1]||10]}:ws));
  const delRep=(wi,ri)=>onChange(weightSets.map((ws,i)=>i===wi?{...ws,reps:ws.reps.filter((_,j)=>j!==ri)}:ws));
  const del=(wi)=>onChange(weightSets.filter((_,i)=>i!==wi));
  const add=()=>onChange([...weightSets,{weight:"",reps:[10]}]);
  return(
    <div>
      {weightSets.map((ws,wi)=>(
        <div key={wi} style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <input value={ws.weight} onChange={e=>upd(wi,"weight",e.target.value)} placeholder={t.weightPlaceholder}
              style={{flex:1,background:C.f5,border:"none",borderRadius:8,padding:"8px 10px",fontSize:14,fontWeight:600,color:C.text,outline:"none",fontFamily:"inherit"}}/>
            <button onClick={()=>del(wi)} style={{background:"none",border:"none",color:C.label,fontSize:20,cursor:"pointer",padding:"0 2px",lineHeight:1}}>×</button>
          </div>
          <div style={{fontSize:12,color:C.label,marginBottom:8,paddingLeft:2}}>{t.weSets}</div>
          <div style={{display:"flex",alignItems:"flex-end",flexWrap:"wrap",gap:8,paddingLeft:2}}>
            {ws.reps.map((r,ri)=>(
              <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <RepsPicker value={r} onChange={val=>updRep(wi,ri,val)}/>
                {ws.reps.length>1&&(
                  <button onClick={()=>delRep(wi,ri)}
                    style={{width:20,height:20,borderRadius:"50%",background:C.label,border:"none",color:"#fff",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>×</button>
                )}
              </div>
            ))}
            <button onClick={()=>addRep(wi)}
              style={{width:52,height:36*5,background:"none",border:`1.5px dashed ${C.sep}`,borderRadius:10,color:C.blue,fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",alignSelf:"flex-start"}}>+</button>
          </div>
        </div>
      ))}
      <button onClick={add} style={{display:"flex",alignItems:"center",gap:4,background:"none",border:`1.5px dashed ${C.sep}`,borderRadius:10,padding:"8px 14px",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:4}}>
        {t.weAddSet}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  LOG TAB
// ═══════════════════════════════════════════════════════
function LogTab({library,onSave,showToast}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const [muscleGroups,setMG]=useState([]);
  const [showMGPicker,setShowMG]=useState(false);
  const [rows,setRows]=useState([]);
  const [showLibPicker,setShowLib]=useState(false);
  const [libSearch,setLibSearch]=useState("");
  const [selectedDate,setSelectedDate]=useState(todayStr());
  const [showDatePicker,setShowDatePicker]=useState(false);

  const addRow=(libId)=>{
    const item=library.find(l=>l.id===libId);
    const lastH=item?.history.length>0?item.history[item.history.length-1]:null;
    setRows(p=>[...p,{
      libId,
      equipment: lastH?.equipment||"",
      weightSets: lastH?.weightSets ? JSON.parse(JSON.stringify(lastH.weightSets)) : [{weight:"",reps:[10,10,10]}],
      feeling:"",
      noteLocal: item?.note||"",
      noteDirty: false,
    }]);
    setShowLib(false); setLibSearch("");
  };

  const upd=(i,patch)=>setRows(p=>p.map((r,j)=>j===i?{...r,...patch}:r));
  const del=(i)=>setRows(p=>p.filter((_,j)=>j!==i));

  const filteredLib=library.filter(it=>!libSearch||it.name.includes(libSearch)||it.muscleGroup.includes(libSearch)||(lang==="en"&&(MG_EN[it.muscleGroup]||"").toLowerCase().includes(libSearch.toLowerCase())));
  const grouped=filteredLib.reduce((acc,it)=>{if(!acc[it.muscleGroup])acc[it.muscleGroup]=[];acc[it.muscleGroup].push(it);return acc;},{});

  const handleSave=()=>{
    if(rows.length===0){showToast(t.atLeastOne);return;}
    const sd=localDate(selectedDate);
    const workout={
      id:uid(), date:selectedDate, weekday:WEEKDAYS[sd.getDay()],
      muscleGroups: muscleGroups.length>0 ? muscleGroups
        : [...new Set(rows.map(r=>library.find(l=>l.id===r.libId)?.muscleGroup).filter(Boolean))],
      exercises: rows.map(r=>({libId:r.libId,equipment:r.equipment,weightSets:r.weightSets,feeling:r.feeling})),
    };
    const noteUpdates=rows.filter(r=>r.noteDirty).map(r=>({libId:r.libId,note:r.noteLocal}));
    // 先清理本地狀態，再呼叫 onSave，避免多層 setState 同時觸發 freeze
    setRows([]); setMG([]); setSelectedDate(todayStr());
    setTimeout(()=>onSave(workout,noteUpdates), 0);
  };

  const sd=localDate(selectedDate);
  const isToday=selectedDate===todayStr();
  const dateLabel=lang==="zh"
    ?`${sd.getMonth()+1}/${sd.getDate()} ${WEEKDAY_CN[sd.getDay()]}`
    :`${sd.getMonth()+1}/${sd.getDate()} ${WEEKDAYS[sd.getDay()].slice(0,3)}`;

  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      {/* 日期選擇器 Sheet */}
      {showDatePicker&&(()=>{
        const today=localDate(todayStr());
        const cur=localDate(selectedDate);
        // 產生過去 60 天的日期清單
        const days=Array.from({length:10},(_,i)=>{
          const d=new Date(today); d.setDate(today.getDate()-(i+1));
          return d;
        });
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",flexDirection:"column",zIndex:200}}
            onClick={e=>{if(e.target===e.currentTarget)setShowDatePicker(false);}}>
            <div style={{marginTop:"auto",background:C.card,borderRadius:"20px 20px 0 0",maxHeight:"70vh",display:"flex",flexDirection:"column"}}>
              {/* Handle */}
              <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
                <div style={{width:36,height:4,borderRadius:2,background:C.sep}}/>
              </div>
              {/* Title */}
              <div style={{padding:"8px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.sep}`}}>
                <span style={{fontSize:17,fontWeight:700,color:C.text}}>{lang==="zh"?"選擇日期":"Select Date"}</span>
                <button onClick={()=>setShowDatePicker(false)}
                  style={{background:C.f5,border:"none",borderRadius:"50%",width:28,height:28,color:C.label,fontSize:16,cursor:"pointer"}}>×</button>
              </div>
              {/* 日期清單 */}
              <div style={{overflowY:"auto",padding:"8px 16px 32px"}}>
                {/* 提醒文字 */}
                <div style={{fontSize:12,color:C.label,textAlign:"center",padding:"8px 0 12px",lineHeight:1.6}}>
                  {lang==="zh"?"補登日期僅限前 10 日之內":"Back-logging is limited to the past 10 days"}
                </div>
                {days.map((d,i)=>{
                  const ds=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
                  const isSelected=ds===selectedDate;
                  const isT=ds===todayStr();
                  const dow=d.getDay();
                  const label=lang==="zh"
                    ?`${d.getMonth()+1}月${d.getDate()}日　${WEEKDAY_CN[dow]}`
                    :`${MONTHS_EN[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}　${WEEKDAYS[dow].slice(0,3)}`;
                  return(
                    <button key={ds} onClick={()=>{setSelectedDate(ds);setShowDatePicker(false);}}
                      style={{
                        width:"100%",padding:"13px 16px",marginBottom:4,
                        background:isSelected?C.blue:C.f5,
                        border:isSelected?`none`:`1px solid ${C.sep}`,
                        borderRadius:12,cursor:"pointer",
                        display:"flex",justifyContent:"space-between",alignItems:"center",
                        boxSizing:"border-box",
                      }}>
                      <span style={{fontSize:15,fontWeight:isSelected?700:400,color:isSelected?"#fff":C.text}}>{label}</span>
                      {isT&&<span style={{fontSize:11,fontWeight:600,
                        color:isSelected?"rgba(255,255,255,0.8)":C.blue,
                        background:isSelected?"rgba(255,255,255,0.2)":`${C.blue}15`,
                        borderRadius:6,padding:"2px 8px"}}>
                        {lang==="zh"?"今天":"Today"}
                      </span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
      <div style={{padding:"8px 20px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:13,color:C.label,marginBottom:1}}>{t.logSubtitle}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:-0.3}}>{dateLabel}</div>
            {!isToday&&<span style={{fontSize:11,fontWeight:600,color:C.orange,background:`${C.orange}15`,borderRadius:6,padding:"2px 8px"}}>{lang==="zh"?"補登":"Back-log"}</span>}
          </div>
        </div>
        <button onClick={()=>setShowDatePicker(true)}
          style={{background:C.f5,border:`1px solid ${C.sep}`,borderRadius:10,padding:"6px 12px",fontSize:13,color:C.sub,cursor:"pointer",marginBottom:4,fontWeight:500}}>
          {lang==="zh"?"更改日期":"Change Date"}
        </button>
      </div>
      <div style={{padding:"16px"}}>
        {/* Muscle group override */}
        <Card style={{marginBottom:16}}>
          <div style={{padding:"12px 16px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
            <span style={{fontSize:12,fontWeight:500,color:C.label,letterSpacing:0.3}}>{t.logMuscleLabel}</span>
            {muscleGroups.map(mg=>(
              <span key={mg} style={{display:"inline-flex",alignItems:"center",gap:4,background:`${C.indigo}15`,borderRadius:20,padding:"3px 10px",fontSize:13,fontWeight:500,color:C.indigo}}>
                {lang==="en"?MG_EN[mg]||mg:mg}
                <button onClick={()=>setMG(p=>p.filter(x=>x!==mg))} style={{background:"none",border:"none",cursor:"pointer",padding:0,color:C.indigo,fontSize:14,lineHeight:1}}>×</button>
              </span>
            ))}
            <button onClick={()=>setShowMG(v=>!v)} style={{background:`${C.blue}10`,border:`1px dashed ${C.blue}60`,borderRadius:20,padding:"3px 12px",fontSize:13,fontWeight:500,color:C.blue,cursor:"pointer"}}>
              {showMGPicker?t.logCollapse:t.logCustomMuscle}
            </button>
          </div>
          {showMGPicker&&(
            <div style={{padding:"0 16px 14px",display:"flex",flexWrap:"wrap",gap:6}}>
              {MG_OPTIONS.filter(m=>!muscleGroups.includes(m)).map(m=>(
                <button key={m} onClick={()=>setMG(p=>[...p,m])} style={{background:C.f5,border:`1px solid ${C.sep}`,borderRadius:20,padding:"5px 14px",fontSize:13,color:C.sub,cursor:"pointer"}}>
                  {lang==="en"?MG_EN[m]||m:m}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Exercise rows */}
        {rows.map((row,i)=>{
          const item=library.find(l=>l.id===row.libId);
          if(!item) return null;
          const mgLabel=lang==="en"?MG_EN[item.muscleGroup]||item.muscleGroup:item.muscleGroup;
          return(
            <Card key={i} style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px 12px"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:item.color,flexShrink:0}}/>
                <span style={{flex:1,fontSize:16,fontWeight:700,color:C.text}}>{item.name}</span>
                <span style={{fontSize:11,color:item.color,background:`${item.color}15`,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{mgLabel}</span>
                <button onClick={()=>del(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:13,fontWeight:500}}>{t.logRemove}</button>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4}}>{t.logEquipLabel}</div>
                  {row.equipment&&<div style={{fontSize:10,color:C.blue,background:`${C.blue}10`,borderRadius:6,padding:"2px 8px"}}>{t.logEquipHint}</div>}
                </div>
                <textarea value={row.equipment} onChange={e=>upd(i,{equipment:e.target.value})} placeholder={t.logEquipPlaceholder}
                  style={{width:"100%",background:C.f3,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.sub,resize:"none",height:54,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.5}}/>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4}}>{t.logSetsLabel}</div>
                  {row.weightSets.some(ws=>ws.weight)&&<div style={{fontSize:10,color:C.blue,background:`${C.blue}10`,borderRadius:6,padding:"2px 8px"}}>{t.logSetsHint}</div>}
                </div>
                <WeightSetEditor weightSets={row.weightSets} onChange={ws=>upd(i,{weightSets:ws})}/>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4}}>{t.logKnowledgeLabel}</div>
                    <div style={{fontSize:10,color:C.label,marginTop:1}}>{t.logKnowledgeSub}</div>
                  </div>
                  {row.noteDirty&&<span style={{fontSize:10,color:C.orange,fontWeight:600,background:`${C.orange}15`,borderRadius:6,padding:"2px 8px"}}>{t.logKnowledgeDirty}</span>}
                </div>
                <textarea value={row.noteLocal}
                  onChange={e=>upd(i,{noteLocal:e.target.value,noteDirty:true})}
                  placeholder={t.logKnowledgePlaceholder}
                  style={{width:"100%",background:C.f3,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.sub,resize:"none",height:90,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.6}}/>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:0.4,marginBottom:2}}>{t.logFeelingLabel}</div>
                <div style={{fontSize:10,color:C.label,marginBottom:6}}>{t.logFeelingSub}</div>
                <textarea value={row.feeling} onChange={e=>upd(i,{feeling:e.target.value})} placeholder={t.logFeelingPlaceholder}
                  style={{width:"100%",background:`${C.orange}08`,border:`1px solid ${C.orange}30`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.sub,resize:"none",height:64,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.6}}/>
              </div>
            </Card>
          );
        })}

        <button onClick={()=>setShowLib(true)}
          style={{width:"100%",padding:"15px",background:C.card,border:`2px dashed ${C.sep}`,borderRadius:16,color:C.blue,fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxSizing:"border-box"}}>
          {t.logAddExercise}
        </button>
        <button onClick={handleSave} disabled={rows.length===0}
          style={{width:"100%",padding:"16px",background:rows.length>0?C.blue:"#C7C7CC",border:"none",borderRadius:16,color:"#fff",fontSize:17,fontWeight:600,cursor:rows.length>0?"pointer":"not-allowed",boxShadow:rows.length>0?"0 4px 16px rgba(0,122,255,0.3)":"none"}}>
          {t.logSave}
        </button>
      </div>

      {/* Library picker sheet */}
      {showLibPicker&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",flexDirection:"column",zIndex:200}}
          onClick={e=>{if(e.target===e.currentTarget){setShowLib(false);setLibSearch("");}}}>
          <div style={{marginTop:"auto",background:C.card,borderRadius:"20px 20px 0 0",maxHeight:"75vh",display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"10px 0 4px"}}>
              <div style={{width:36,height:4,borderRadius:2,background:"#C7C7CC"}}/>
            </div>
            <div style={{padding:"8px 20px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.sep}`}}>
              <span style={{fontSize:17,fontWeight:600,color:C.text}}>{t.logPickerTitle}</span>
              <button onClick={()=>{setShowLib(false);setLibSearch("");}} style={{background:C.f5,border:"none",borderRadius:"50%",width:28,height:28,color:C.label,fontSize:16,cursor:"pointer"}}>×</button>
            </div>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.sep}`}}>
              <input value={libSearch} onChange={e=>setLibSearch(e.target.value)} placeholder={t.logPickerSearch}
                style={{width:"100%",background:C.bg,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 14px",fontSize:15,color:C.text,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
            </div>
            <div style={{overflowY:"auto",paddingBottom:20}}>
              {Object.entries(grouped).map(([mg,items])=>(
                <div key={mg}>
                  <div style={{padding:"12px 20px 6px",fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.5}}>
                    {lang==="en"?MG_EN[mg]||mg:mg}
                  </div>
                  {items.map((it,i)=>(
                    <div key={it.id}>
                      {i>0&&<Div left={20}/>}
                      <button onClick={()=>addRow(it.id)}
                        style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"13px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
                        <div style={{width:10,height:10,borderRadius:"50%",background:it.color,flexShrink:0}}/>
                        <span style={{flex:1,fontSize:16,color:C.text}}>{it.name}</span>
                        {it.history.length>0&&<span style={{fontSize:11,color:C.label}}>{t.logLastSeen} {fmtDate(it.history[it.history.length-1].date,lang)}</span>}
                        <span style={{color:C.blue,fontSize:20,lineHeight:1}}>+</span>
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  HISTORY TAB
// ═══════════════════════════════════════════════════════
function HistoryTab({workouts,library,onOpenDay}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const [search,setSearch]=useState("");

  const filtered=workouts.filter(w=>{
    if(!search) return true;
    const names=w.exercises.map(ex=>{const it=library.find(l=>l.id===ex.libId);return it?it.name+(MG_EN[it.muscleGroup]||""):"";}).join("");
    return names.toLowerCase().includes(search.toLowerCase())||w.muscleGroups.some(g=>g.includes(search)||(MG_EN[g]||"").toLowerCase().includes(search.toLowerCase()));
  });

  // 依日期分組，合併同一天的所有訓練
  const byDate={};
  filtered.forEach(w=>{
    if(!byDate[w.date]) byDate[w.date]={date:w.date,weekday:w.weekday,workouts:[]};
    byDate[w.date].workouts.push(w);
  });
  const dates=Object.keys(byDate).sort((a,b)=>new Date(b)-new Date(a));

  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"8px 20px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`}}>
        <div style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:-0.5,marginBottom:10}}>{t.historyTitle}</div>
        <div style={{position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.label,fontSize:15}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.historySearch}
            style={{width:"100%",background:C.bg,border:`1px solid ${C.sep}`,borderRadius:10,padding:"9px 12px 9px 36px",fontSize:15,color:C.text,boxSizing:"border-box",outline:"none",fontFamily:"inherit"}}/>
        </div>
      </div>
      <div style={{padding:"16px"}}>
        {dates.map(date=>{
          const day=byDate[date];
          const d=localDate(date);
          const wdLabel=lang==="zh"?WEEKDAY_CN[d.getDay()]:WEEKDAYS[d.getDay()].slice(0,3);
          const allMGs=[...new Set(day.workouts.flatMap(w=>w.muscleGroups))];
          const allExercises=day.workouts.flatMap(w=>w.exercises);
          // 點擊進入第一筆（單筆）或最後記錄的那筆
          const firstId=day.workouts[0].id;
          return(
            <Card key={date} style={{marginBottom:12,cursor:"pointer"}}>
              <div onClick={()=>onOpenDay(date)} style={{padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                    <span style={{fontSize:15,fontWeight:700,color:C.text}}>{d.getMonth()+1}/{d.getDate()}</span>
                    <span style={{fontSize:12,fontWeight:500,color:C.blue,background:`${C.blue}12`,borderRadius:6,padding:"2px 8px"}}>{wdLabel}</span>
                    {allMGs.map(mg=>(
                      <span key={mg} style={{fontSize:12,fontWeight:500,color:C.indigo,background:`${C.indigo}12`,borderRadius:6,padding:"2px 8px"}}>
                        {lang==="en"?MG_EN[mg]||mg:mg}
                      </span>
                    ))}
                  </div>
                  <svg viewBox="0 0 24 24" fill={C.sep} width="14" height="14"><path d="M10 6l6 6-6 6V6z"/></svg>
                </div>
                {allExercises.map((ex,i)=>{
                  const it=library.find(l=>l.id===ex.libId);
                  return(
                    <div key={i} style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:3}}>
                      {it&&<div style={{width:7,height:7,borderRadius:"50%",background:it.color,flexShrink:0,marginBottom:1}}/>}
                      <span style={{fontSize:14,fontWeight:500,color:C.text,flexShrink:0}}>{it?it.name:(lang==="en"?"(Deleted)":"(已刪除)")}</span>
                      <span style={{fontSize:12,color:C.label,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ex.weightSets.map(ws=>`${ws.weight} ×${ws.reps.join("/")}${t.repsUnit}`).join("  ")}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
        {dates.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:C.label}}><div style={{fontSize:36,marginBottom:10}}>📭</div><div style={{fontSize:15,fontWeight:500}}>{t.historyEmpty}</div></div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  DETAIL TAB
// ═══════════════════════════════════════════════════════
function DetailTab({workout,library,onBack,onOpenLibItem,onUpdateWorkout,onDeleteWorkout}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const [editing,setEditing]=useState(false);
  const [rows,setRows]=useState([]);
  const [confirmDelete,setConfirmDelete]=useState(false);

  if(!workout) return null;
  const d=localDate(workout.date);
  const wdLabel=lang==="zh"?WEEKDAY_CN[d.getDay()]:WEEKDAYS[d.getDay()].slice(0,3);

  const startEdit=()=>{
    setRows(workout.exercises.map(ex=>({...ex,weightSets:JSON.parse(JSON.stringify(ex.weightSets))})));
    setEditing(true);
  };
  const cancelEdit=()=>setEditing(false);
  const saveEdit=()=>{ onUpdateWorkout({...workout,exercises:rows}); setEditing(false); };
  const confirmDoDelete=()=>{ onDeleteWorkout(workout.id); };
  const updRow=(i,patch)=>setRows(p=>p.map((r,j)=>j===i?{...r,...patch}:r));

  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      {/* 刪除確認對話框 */}
      {confirmDelete&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:"20px"}}>
          <div style={{background:C.card,borderRadius:16,padding:"24px 20px",width:"100%",maxWidth:320}}>
            <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:10,textAlign:"center"}}>{lang==="zh"?"刪除紀錄":"Delete Workout"}</div>
            <div style={{fontSize:14,color:C.sub,marginBottom:20,textAlign:"center",lineHeight:1.6}}>{t.detailDeleteConfirm}</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDelete(false)} style={{flex:1,padding:"12px",background:C.f5,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:C.sub,cursor:"pointer"}}>{lang==="zh"?"取消":"Cancel"}</button>
              <button onClick={confirmDoDelete} style={{flex:1,padding:"12px",background:C.red,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:"#fff",cursor:"pointer"}}>{lang==="zh"?"刪除":"Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{padding:"8px 16px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",alignItems:"center",gap:8}}>
        <button onClick={editing?cancelEdit:onBack}
          style={{background:"none",border:"none",cursor:"pointer",padding:"4px 0",color:C.blue,fontSize:16,fontWeight:500,flexShrink:0}}>
          {editing?(lang==="zh"?"取消":"Cancel"):t.detailBack}
        </button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:600,color:C.text}}>{d.getMonth()+1}/{d.getDate()} {wdLabel}</div>
          {!editing&&(
            <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:4,flexWrap:"wrap"}}>
              {workout.muscleGroups.map(mg=>(
                <span key={mg} style={{fontSize:12,fontWeight:500,color:C.indigo,background:`${C.indigo}12`,borderRadius:6,padding:"2px 8px"}}>
                  {lang==="en"?MG_EN[mg]||mg:mg}
                </span>
              ))}
            </div>
          )}
          {editing&&<div style={{fontSize:12,color:C.orange,marginTop:2}}>{lang==="zh"?"編輯模式":"Editing"}</div>}
        </div>
        {!editing
          ?<button onClick={startEdit} style={{background:`${C.blue}15`,border:"none",borderRadius:8,padding:"6px 12px",fontSize:13,fontWeight:600,color:C.blue,cursor:"pointer",flexShrink:0}}>
            {t.detailEdit}
          </button>
          :<button onClick={saveEdit} style={{background:C.blue,border:"none",borderRadius:8,padding:"6px 12px",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",flexShrink:0}}>
            {t.detailSaveEdit}
          </button>
        }
      </div>

      <div style={{padding:"16px"}}>
        {/* ── VIEW MODE ── */}
        {!editing && workout.exercises.map((ex,i)=>{
          const it=library.find(l=>l.id===ex.libId);
          if(!it) return(
            <Card key={i} style={{marginBottom:16}}>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:C.label,flexShrink:0}}/>
                <span style={{fontSize:15,color:C.label,fontStyle:"italic"}}>{lang==="en"?"(Exercise deleted from library)":"（此動作已從動作庫刪除）"}</span>
              </div>
            </Card>
          );
          const mgLabel=lang==="en"?MG_EN[it.muscleGroup]||it.muscleGroup:it.muscleGroup;
          return(
            <Card key={i} style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px 12px"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:it.color,flexShrink:0}}/>
                <span style={{flex:1,fontSize:17,fontWeight:700,color:C.text}}>{it.name}</span>
                <button onClick={()=>onOpenLibItem(it.id)} style={{background:`${it.color}15`,border:"none",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600,color:it.color,cursor:"pointer"}}>{t.detailLibBtn}</button>
              </div>
              {ex.equipment&&(<><Div/><div style={{padding:"10px 16px"}}><div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:4}}>{t.detailEquip}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{ex.equipment}</div></div></>)}
              <Div/>
              <div style={{padding:"10px 16px"}}>
                <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:10}}>{t.detailSets}</div>
                {ex.weightSets.map((ws,wi)=>(
                  <div key={wi} style={{marginBottom:10}}>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:5}}>{ws.weight}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingLeft:4}}>
                      {ws.reps.map((r,ri)=>(<div key={ri} style={{background:C.f5,borderRadius:8,padding:"6px 14px",fontSize:15,fontWeight:600,color:C.text}}>{r}<span style={{fontSize:11,color:C.label,marginLeft:1}}>{t.repsUnit}</span></div>))}
                      <div style={{display:"flex",alignItems:"center",padding:"0 6px",fontSize:13,color:C.label}}>{t.totalReps} {ws.reps.reduce((a,b)=>a+b,0)} {t.repsUnit}</div>
                    </div>
                  </div>
                ))}
              </div>
              {it.note&&(<><Div/><div style={{padding:"10px 16px"}}><div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:2}}>{t.detailKnowledge}</div><div style={{fontSize:10,color:C.label,marginBottom:6}}>{t.detailKnowledgeSub}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.7,whiteSpace:"pre-wrap",background:C.f3,borderRadius:10,padding:"10px 12px"}}>{it.note}</div></div></>)}
              {ex.feeling&&(<><Div/><div style={{padding:"10px 16px 14px"}}><div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:0.4,marginBottom:2}}>{t.detailFeeling}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.7,whiteSpace:"pre-wrap",background:`${C.orange}08`,border:`1px solid ${C.orange}25`,borderRadius:10,padding:"10px 12px"}}>{ex.feeling}</div></div></>)}
            </Card>
          );
        })}

        {/* ── EDIT MODE ── */}
        {editing && rows.map((row,i)=>{
          const it=library.find(l=>l.id===row.libId);
          if(!it) return(
            <Card key={i} style={{marginBottom:12}}>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:C.label,flexShrink:0}}/>
                <span style={{fontSize:15,color:C.label,fontStyle:"italic"}}>{lang==="en"?"(Exercise deleted from library)":"（此動作已從動作庫刪除）"}</span>
              </div>
            </Card>
          );
          return(
            <Card key={i} style={{marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px 12px"}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:it.color,flexShrink:0}}/>
                <span style={{flex:1,fontSize:16,fontWeight:700,color:C.text}}>{it.name}</span>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:6}}>{t.detailEquip}</div>
                <textarea value={row.equipment} onChange={e=>updRow(i,{equipment:e.target.value})}
                  placeholder={t.logEquipPlaceholder}
                  style={{width:"100%",background:C.f3,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.sub,resize:"none",height:54,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.5}}/>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:10}}>{t.detailSets}</div>
                <WeightSetEditor weightSets={row.weightSets} onChange={ws=>updRow(i,{weightSets:ws})}/>
              </div>
              <Div/>
              <div style={{padding:"12px 16px"}}>
                <div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:0.4,marginBottom:2}}>{t.detailFeeling}</div>
                <textarea value={row.feeling||""} onChange={e=>updRow(i,{feeling:e.target.value})}
                  placeholder={t.logFeelingPlaceholder}
                  style={{width:"100%",background:`${C.orange}08`,border:`1px solid ${C.orange}30`,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.sub,resize:"none",height:64,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.6}}/>
              </div>
            </Card>
          );
        })}

        {/* 刪除按鈕：只在檢視模式顯示，放在最底部 */}
        {!editing&&(
          <button onClick={()=>setConfirmDelete(true)}
            style={{width:"100%",padding:"14px",background:"none",border:`1.5px solid ${C.red}`,borderRadius:16,color:C.red,fontSize:15,fontWeight:600,cursor:"pointer",marginTop:4}}>
            {t.detailDelete}
          </button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  LIBRARY TAB  +  ITEM DETAIL
// ═══════════════════════════════════════════════════════
function LibItemDetail({item,onUpdate,onDelete,onBack}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const lastH=item.history.length>0?item.history[item.history.length-1]:null;
  const [editNote,     setEditNote]     =useState(item.note);
  const [editName,     setEditName]     =useState(item.name);
  const [editMG,       setEditMG]       =useState(item.muscleGroup);
  const [editColor,    setEditColor]    =useState(item.color);
  const [editEquip,    setEditEquip]    =useState(lastH?.equipment||"");
  const [editWSets,    setEditWSets]    =useState(lastH?.weightSets?JSON.parse(JSON.stringify(lastH.weightSets)):[{weight:"",reps:[10]}]);
  const [editingMeta,  setEM]           =useState(false);
  const [confirmDelete,setConfirmDelete]=useState(false);

  const noteDirty  = editNote!==item.note;
  const equipDirty = editEquip!==(lastH?.equipment||"");
  const wsetsDirty = JSON.stringify(editWSets)!==JSON.stringify(lastH?.weightSets||[{weight:"",reps:[10]}]);
  const metaDirty  = editName!==item.name||editMG!==item.muscleGroup||editColor!==item.color;
  const anyDirty   = noteDirty||equipDirty||wsetsDirty||metaDirty;

  const save=()=>{
    // 更新 history 最後一筆的 equipment 和 weightSets
    const updatedHistory = item.history.length>0
      ? item.history.map((h,i)=>i===item.history.length-1
          ? {...h, equipment:editEquip, weightSets:editWSets}
          : h)
      : item.history;
    onUpdate({...item, note:editNote, name:editName, muscleGroup:editMG, color:editColor, history:updatedHistory});
  };
  const mgLabel=lang==="en"?MG_EN[editMG]||editMG:editMG;
  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg,display:"flex",flexDirection:"column"}}>
      {/* 刪除確認對話框 */}
      {confirmDelete&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:"20px"}}>
          <div style={{background:C.card,borderRadius:16,padding:"24px 20px",width:"100%",maxWidth:320}}>
            <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:10,textAlign:"center"}}>
              {lang==="zh"?"刪除動作":"Delete Exercise"}
            </div>
            <div style={{fontSize:14,color:C.sub,marginBottom:20,textAlign:"center",lineHeight:1.6}}>
              {lang==="zh"
                ?`確定要刪除「${item.name}」嗎？相關的訓練歷史紀錄不受影響，但此動作無法復原。`
                :`Delete "${item.name}"? Training history won't be affected, but this cannot be undone.`}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDelete(false)}
                style={{flex:1,padding:"12px",background:C.f5,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:C.sub,cursor:"pointer"}}>
                {lang==="zh"?"取消":"Cancel"}
              </button>
              <button onClick={onDelete}
                style={{flex:1,padding:"12px",background:C.red,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:"#fff",cursor:"pointer"}}>
                {lang==="zh"?"刪除":"Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{padding:"8px 20px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 0",color:C.blue,fontSize:16,fontWeight:500}}>‹</button>
        <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:12,height:12,borderRadius:"50%",background:editColor}}/>
          <span style={{fontSize:17,fontWeight:700,color:C.text}}>{editName}</span>
          <span style={{fontSize:12,color:editColor,background:`${editColor}15`,borderRadius:6,padding:"2px 8px",fontWeight:600}}>{mgLabel}</span>
        </div>
        <button onClick={()=>setEM(v=>!v)} style={{background:editingMeta?`${C.blue}15`:C.f5,border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:editingMeta?C.blue:C.sub,cursor:"pointer"}}>
          {editingMeta?t.libItemDone:t.libItemEdit}
        </button>
      </div>
      <div style={{padding:"16px",flex:1,overflowY:"auto"}}>
        {editingMeta&&(
          <Card style={{marginBottom:16,padding:"16px"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>{t.libItemEditTitle}</div>
            <input value={editName} onChange={e=>setEditName(e.target.value)} placeholder={t.addName}
              style={{width:"100%",background:C.f5,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 12px",fontSize:15,color:C.text,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:10}}/>
            <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:6}}>{t.libItemMuscle}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {MG_OPTIONS.map(mg=>(
                <button key={mg} onClick={()=>setEditMG(mg)} style={{background:editMG===mg?C.blue:"none",border:`1px solid ${editMG===mg?C.blue:C.sep}`,borderRadius:20,padding:"4px 12px",fontSize:12,color:editMG===mg?"#fff":C.sub,cursor:"pointer"}}>
                  {lang==="en"?MG_EN[mg]||mg:mg}
                </button>
              ))}
            </div>
            <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:6}}>{t.libItemColor}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {COLOR_OPTS.map(col=>(
                <button key={col} onClick={()=>setEditColor(col)} style={{width:28,height:28,borderRadius:"50%",background:col,border:editColor===col?`3px solid ${C.text}`:"3px solid transparent",cursor:"pointer",padding:0,boxSizing:"border-box"}}/>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={save} disabled={!anyDirty}
                style={{flex:1,padding:"10px",background:!anyDirty?"#C7C7CC":C.blue,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:!anyDirty?"not-allowed":"pointer"}}>
                {t.libItemSave}
              </button>
              <button onClick={()=>setConfirmDelete(true)} style={{padding:"10px 14px",background:"none",border:`1.5px solid ${C.red}`,borderRadius:12,color:C.red,fontSize:14,fontWeight:600,cursor:"pointer"}}>{t.libItemDelete}</button>
            </div>
          </Card>
        )}

        {/* 上次器材設定（可編輯，下次訓練自動代入） */}
        <SLabel>{t.libLastEquip}</SLabel>
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.blue,marginBottom:8}}>{t.libLastEquipSub}</div>
            {item.history.length===0
              ?<div style={{fontSize:13,color:C.label,fontStyle:"italic"}}>{t.libLastEquipPlaceholder}</div>
              :<textarea value={editEquip} onChange={e=>setEditEquip(e.target.value)}
                placeholder={t.logEquipPlaceholder}
                style={{width:"100%",background:"none",border:"none",fontSize:13,color:C.sub,resize:"none",minHeight:72,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.6}}/>
            }
          </div>
          {equipDirty&&(
            <div style={{padding:"0 16px 14px"}}>
              <button onClick={save} style={{width:"100%",padding:"10px",background:C.blue,border:"none",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>{t.libItemSave}</button>
            </div>
          )}
        </Card>

        {/* 上次重量組次（可編輯，下次訓練自動代入） */}
        <SLabel>{t.libLastSets}</SLabel>
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.blue,marginBottom:10}}>{t.libLastSetsSub}</div>
            {item.history.length===0
              ?<div style={{fontSize:13,color:C.label,fontStyle:"italic"}}>{t.libHistoryEmpty}</div>
              :<WeightSetEditor weightSets={editWSets} onChange={setEditWSets}/>
            }
          </div>
          {wsetsDirty&&(
            <div style={{padding:"0 16px 14px"}}>
              <button onClick={save} style={{width:"100%",padding:"10px",background:C.blue,border:"none",borderRadius:12,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>{t.libItemSave}</button>
            </div>
          )}
        </Card>

        <SLabel>{t.libNoteTitle}</SLabel>
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px"}}>
            <div style={{fontSize:11,color:C.label,marginBottom:8}}>{t.libNoteSub}</div>
            <textarea value={editNote} onChange={e=>setEditNote(e.target.value)} placeholder={t.libNotePlaceholder}
              style={{width:"100%",background:"none",border:"none",fontSize:14,color:C.sub,resize:"none",minHeight:140,boxSizing:"border-box",outline:"none",fontFamily:"inherit",lineHeight:1.7}}/>
          </div>
          {noteDirty&&(
            <div style={{padding:"0 16px 14px"}}>
              <button onClick={save} style={{width:"100%",padding:"11px",background:C.blue,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>{t.libNoteSave}</button>
            </div>
          )}
        </Card>
        <SLabel>{t.libHistoryTitle}（{item.history.length}）</SLabel>
        {item.history.length===0&&<Card style={{marginBottom:16}}><div style={{padding:"32px",textAlign:"center",color:C.label,fontSize:14}}>{t.libHistoryEmpty}</div></Card>}
        {[...item.history].reverse().map((h,i)=>(
          <Card key={i} style={{marginBottom:10}}>
            <div style={{padding:"12px 16px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:700,color:C.text}}>{fmtDate(h.date,lang)}</span>
              <span style={{fontSize:12,color:C.label}}>{h.date}</span>
            </div>
            {h.equipment&&(<><Div/><div style={{padding:"8px 16px"}}><div style={{fontSize:11,fontWeight:600,color:C.label,marginBottom:3}}>{t.libEquip}</div><div style={{fontSize:13,color:C.sub,whiteSpace:"pre-wrap"}}>{h.equipment}</div></div></>)}
            <Div/>
            <div style={{padding:"10px 16px"}}>
              {h.weightSets.map((ws,wi)=>(
                <div key={wi} style={{marginBottom:8}}>
                  <span style={{fontSize:13,fontWeight:700,color:C.text,marginRight:10}}>{ws.weight}</span>
                  <span style={{fontSize:12,color:C.label}}>{ws.reps.join(" / ")} {t.repsUnit}</span>
                  <span style={{fontSize:11,color:C.label,marginLeft:8}}>{t.totalReps} {ws.reps.reduce((a,b)=>a+b,0)} {t.repsUnit}</span>
                </div>
              ))}
            </div>
            {h.feeling&&(<><Div/><div style={{padding:"8px 16px 12px"}}><div style={{fontSize:11,fontWeight:600,color:C.orange,marginBottom:4}}>{t.libHistoryFeeling}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.6,whiteSpace:"pre-wrap",background:`${C.orange}08`,borderRadius:8,padding:"8px 10px"}}>{h.feeling}</div></div></>)}
          </Card>
        ))}
      </div>
    </div>
  );
}

function LibraryTab({library,setLibrary,openItemId,setOpenItemId}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  const [showAdd,setShowAdd]=useState(false);
  const [newName,setNewName]=useState("");
  const [newMG,  setNewMG  ]=useState(MG_OPTIONS[0]);
  const [newColor,setNewColor]=useState(COLOR_OPTS[0]);
  const [search, setSearch ]=useState("");

  const addItem=()=>{
    if(!newName.trim()) return;
    setLibrary(p=>[...p,{id:uid(),name:newName.trim(),muscleGroup:newMG,color:newColor,note:"",history:[]}]);
    setNewName(""); setShowAdd(false);
  };

  if(openItemId){
    const item=library.find(l=>l.id===openItemId);
    if(item) return(
      <LibItemDetail item={item}
        onUpdate={updated=>setLibrary(p=>p.map(l=>l.id===updated.id?updated:l))}
        onDelete={()=>{setLibrary(p=>p.filter(l=>l.id!==openItemId));setOpenItemId(null);}}
        onBack={()=>setOpenItemId(null)}/>
    );
  }

  const filtered=library.filter(it=>!search||it.name.toLowerCase().includes(search.toLowerCase())||(MG_EN[it.muscleGroup]||"").toLowerCase().includes(search.toLowerCase())||it.muscleGroup.includes(search));
  const grouped=filtered.reduce((acc,it)=>{if(!acc[it.muscleGroup])acc[it.muscleGroup]=[];acc[it.muscleGroup].push(it);return acc;},{});

  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      <div style={{padding:"8px 20px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:13,color:C.label,marginBottom:2}}>{t.libSubtitle}</div>
          <div style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:-0.5}}>{t.libTitle}</div>
        </div>
        <button onClick={()=>setShowAdd(v=>!v)} style={{background:C.blue,border:"none",borderRadius:12,padding:"8px 16px",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:4}}>{t.libAdd}</button>
      </div>
      <div style={{padding:"16px"}}>
        {showAdd&&(
          <Card style={{marginBottom:16,padding:"16px"}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>{t.addBtn}</div>
            <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder={t.addName}
              style={{width:"100%",background:C.f5,border:`1px solid ${C.sep}`,borderRadius:10,padding:"10px 12px",fontSize:15,color:C.text,boxSizing:"border-box",outline:"none",fontFamily:"inherit",marginBottom:12}}/>
            <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:6}}>{t.addMuscle}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
              {MG_OPTIONS.map(mg=>(
                <button key={mg} onClick={()=>setNewMG(mg)} style={{background:newMG===mg?C.blue:"none",border:`1px solid ${newMG===mg?C.blue:C.sep}`,borderRadius:20,padding:"5px 12px",fontSize:13,color:newMG===mg?"#fff":C.sub,cursor:"pointer"}}>
                  {lang==="en"?MG_EN[mg]||mg:mg}
                </button>
              ))}
            </div>
            <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:6}}>{t.addColor}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {COLOR_OPTS.map(col=>(
                <button key={col} onClick={()=>setNewColor(col)} style={{width:28,height:28,borderRadius:"50%",background:col,border:newColor===col?`3px solid ${C.text}`:"3px solid transparent",cursor:"pointer",padding:0,boxSizing:"border-box"}}/>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={addItem} disabled={!newName.trim()} style={{flex:1,padding:"11px",background:newName.trim()?C.blue:"#C7C7CC",border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:600,cursor:newName.trim()?"pointer":"not-allowed"}}>{t.addBtn}</button>
              <button onClick={()=>{setShowAdd(false);setNewName("");}} style={{padding:"11px 20px",background:C.f5,border:"none",borderRadius:12,color:C.sub,fontSize:15,cursor:"pointer"}}>{t.addCancel}</button>
            </div>
          </Card>
        )}
        <div style={{position:"relative",marginBottom:16}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.label,fontSize:15}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.libSearch}
            style={{width:"100%",background:C.card,border:`1px solid ${C.sep}`,borderRadius:12,padding:"10px 12px 10px 36px",fontSize:15,color:C.text,boxSizing:"border-box",outline:"none",fontFamily:"inherit",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}/>
        </div>
        {Object.entries(grouped).map(([mg,items])=>(
          <div key={mg} style={{marginBottom:16}}>
            <SLabel>{lang==="en"?MG_EN[mg]||mg:mg}</SLabel>
            <Card>
              {items.map((item,i)=>(
                <div key={item.id}>
                  {i>0&&<Div left={54}/>}
                  <div onClick={()=>setOpenItemId(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",cursor:"pointer"}}>
                    <div style={{width:12,height:12,borderRadius:"50%",background:item.color,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:15,fontWeight:500,color:C.text,marginBottom:1}}>{item.name}</div>
                      <div style={{fontSize:11,color:C.label}}>
                        {item.history.length>0
                          ?`${item.history.length} ${t.libRecords} ${fmtDate(item.history[item.history.length-1].date,lang)}`
                          :t.libNoHistory}
                      </div>
                    </div>
                    {item.note&&<span style={{fontSize:11,color:C.blue,background:`${C.blue}10`,borderRadius:6,padding:"2px 8px",flexShrink:0}}>{t.libHasNote}</span>}
                    <svg viewBox="0 0 24 24" fill={C.sep} width="14" height="14"><path d="M10 6l6 6-6 6V6z"/></svg>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:C.label}}><div style={{fontSize:36,marginBottom:10}}>🗂️</div><div style={{fontSize:15,fontWeight:500}}>{t.libEmpty}</div></div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  ABOUT TAB
// ═══════════════════════════════════════════════════════
function AboutTab({workouts,library,onImport}){
  const lang=useLang(); const C=useC();
  const isZh=lang==="zh";
  const [importConfirm,setImportConfirm]=useState(null); // 暫存解析好的資料
  const [importError,setImportError]=useState(null);
  const fileInputRef=React.useRef(null);

  const exportJSON=()=>{
    const data={version:"1.5.1",exportedAt:new Date().toISOString(),workouts,library};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`gymreco-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV=()=>{
    const rows=[["日期","星期","部位","動作","重量","組次","器材","感受"]];
    workouts.forEach(w=>{
      w.exercises.forEach(ex=>{
        const lib=library.find(l=>l.id===ex.libId);
        const name=lib?lib.name:"(已刪除)";
        const mg=lib?lib.muscleGroup:"";
        ex.weightSets.forEach(ws=>{
          rows.push([
            w.date, w.weekday, mg, name,
            ws.weight, ws.reps.join("/"),
            ex.equipment||"", ex.feeling||"",
          ]);
        });
      });
    });
    const csv=rows.map(r=>r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`gymreco-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileSelect=(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    setImportError(null);
    const reader=new FileReader();
    reader.onload=(ev)=>{
      try{
        const parsed=JSON.parse(ev.target.result);
        // 驗證基本結構
        if(!parsed.workouts||!parsed.library||!Array.isArray(parsed.workouts)||!Array.isArray(parsed.library)){
          throw new Error("invalid");
        }
        setImportConfirm(parsed);
      } catch(err){
        setImportError(isZh?"檔案格式不正確，請選擇 GymReco 匯出的 JSON 檔案。":"Invalid file format. Please select a JSON file exported from GymReco.");
      }
    };
    reader.readAsText(file);
    // 清空 input 讓同一個檔案可以重複選
    e.target.value="";
  };

  const confirmImport=()=>{
    onImport(importConfirm.workouts, importConfirm.library);
    setImportConfirm(null);
  };

  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>

      {/* 匯入確認對話框 */}
      {importConfirm&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:"20px"}}>
          <div style={{background:C.card,borderRadius:16,padding:"24px 20px",width:"100%",maxWidth:320}}>
            <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:10,textAlign:"center"}}>
              {isZh?"確認匯入":"Confirm Import"}
            </div>
            <div style={{fontSize:14,color:C.sub,marginBottom:8,textAlign:"center",lineHeight:1.6}}>
              {isZh
                ?`找到 ${importConfirm.workouts.length} 筆訓練紀錄、${importConfirm.library.length} 個動作。`
                :`Found ${importConfirm.workouts.length} workouts and ${importConfirm.library.length} exercises.`}
            </div>
            <div style={{fontSize:13,color:C.red,marginBottom:20,textAlign:"center",lineHeight:1.6,background:`${C.red}10`,borderRadius:10,padding:"8px 12px"}}>
              {isZh?"⚠️ 這將覆蓋你目前所有的資料，此動作無法復原。":"⚠️ This will overwrite all your current data. This cannot be undone."}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setImportConfirm(null)}
                style={{flex:1,padding:"12px",background:C.f5,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:C.sub,cursor:"pointer"}}>
                {isZh?"取消":"Cancel"}
              </button>
              <button onClick={confirmImport}
                style={{flex:1,padding:"12px",background:C.blue,border:"none",borderRadius:12,fontSize:15,fontWeight:600,color:"#fff",cursor:"pointer"}}>
                {isZh?"確認匯入":"Import"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"8px 20px 16px",background:C.card,borderBottom:`1px solid ${C.sep}`}}>
        <div style={{fontSize:13,color:C.label,marginBottom:2}}>{isZh?"關於":"About"}</div>
        <div style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:-0.5}}>GymReco</div>
      </div>
      <div style={{padding:"16px"}}>

        {/* App icon + version */}
        <Card style={{marginBottom:16}}>
          <div style={{padding:"28px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
            <img src={process.env.PUBLIC_URL+"/logo192.png"} alt="GymReco"
              style={{width:72,height:72,borderRadius:18,boxShadow:"0 4px 16px rgba(0,0,0,0.15)",objectFit:"cover"}}/>
            <div style={{fontSize:20,fontWeight:700,color:C.text}}>GymReco</div>
            <div style={{fontSize:13,color:C.label}}>Version 1.7.0</div>
          </div>
        </Card>

        {/* Description */}
        <SLabel>{isZh?"簡介":"Description"}</SLabel>
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px",fontSize:14,color:C.sub,lineHeight:1.8}}>
            {isZh
              ?"GymReco 是一款手機優先的健身紀錄 App，讓你在重訓時快速記錄動作、重量與組次。支援個人動作庫管理、知識筆記累積，以及訓練日曆總覽。所有資料存於本機，不需要帳號。"
              :"GymReco is a mobile-first PWA workout tracker. Quickly log exercises, weights, and sets during your training. Features a personal exercise library with knowledge notes and a training calendar. All data is stored locally — no account required."}
          </div>
        </Card>

        {/* Author */}
        <SLabel>{isZh?"作者":"Author"}</SLabel>
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.indigo})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:700,flexShrink:0}}>R</div>
            <div>
              <div style={{fontSize:15,fontWeight:600,color:C.text}}>Ruby Chen</div>
              <div style={{fontSize:12,color:C.label,marginTop:2}}>@rubychenhaii</div>
            </div>
          </div>
        </Card>

        {/* Links */}
        <SLabel>{isZh?"連結":"Links"}</SLabel>
        <Card style={{marginBottom:16}}>
          <a href="https://github.com/rubychenhaii/workout-tracker" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",textDecoration:"none"}}>
            <div style={{width:32,height:32,borderRadius:8,background:"#1C1C1E",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:600,color:C.text}}>GitHub</div>
              <div style={{fontSize:12,color:C.label}}>rubychenhaii/workout-tracker</div>
            </div>
            <svg viewBox="0 0 24 24" fill={C.sep} width="14" height="14"><path d="M10 6l6 6-6 6V6z"/></svg>
          </a>
        </Card>

        {/* License */}
        <Card style={{marginBottom:16}}>
          <div style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:14,color:C.text}}>{isZh?"授權":"License"}</span>
            <span style={{fontSize:14,color:C.label}}>MIT © 2026 Ruby Chen</span>
          </div>
        </Card>

        {/* Export */}
        <SLabel>{isZh?"資料匯出":"Export Data"}</SLabel>
        <Card style={{marginBottom:32}}>
          <div style={{padding:"14px 16px 6px"}}>
            <div style={{fontSize:12,color:C.label,marginBottom:12}}>
              {isZh?"將你的訓練紀錄和動作庫備份到本機":"Back up your workouts and exercise library"}
            </div>
            <button onClick={exportJSON}
              style={{width:"100%",padding:"12px 16px",background:C.blue,border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:10,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div>{isZh?"匯出 JSON（完整備份）":"Export JSON (Full Backup)"}</div>
                <div style={{fontSize:11,fontWeight:400,opacity:0.8,marginTop:2}}>{isZh?"可用於未來還原資料":"Can be used to restore data later"}</div>
              </div>
              <span style={{fontSize:18}}>↓</span>
            </button>
            <button onClick={exportCSV}
              style={{width:"100%",padding:"12px 16px",background:C.f5,border:`1px solid ${C.sep}`,borderRadius:12,color:C.text,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:10,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div>{isZh?"匯出 CSV（試算表）":"Export CSV (Spreadsheet)"}</div>
                <div style={{fontSize:11,fontWeight:400,color:C.label,marginTop:2}}>{isZh?"可用 Excel 或 Numbers 開啟":"Open with Excel or Numbers"}</div>
              </div>
              <span style={{fontSize:18,color:C.label}}>↓</span>
            </button>
            {/* 隱藏的 file input */}
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect}
              style={{display:"none"}}/>
            <button onClick={()=>fileInputRef.current.click()}
              style={{width:"100%",padding:"12px 16px",background:C.f5,border:`1.5px dashed ${C.sep}`,borderRadius:12,color:C.sub,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:4,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div>{isZh?"匯入 JSON（還原備份）":"Import JSON (Restore Backup)"}</div>
                <div style={{fontSize:11,fontWeight:400,color:C.label,marginTop:2}}>{isZh?"將覆蓋目前所有資料":"Will overwrite all current data"}</div>
              </div>
              <span style={{fontSize:18,color:C.label}}>↑</span>
            </button>
            {importError&&<div style={{fontSize:12,color:C.red,marginTop:6,paddingLeft:4}}>{importError}</div>}
          </div>
        </Card>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  DAY DETAIL TAB（當天所有訓練合併檢視）
// ═══════════════════════════════════════════════════════
function DayDetailTab({dayWorkouts,library,onBack,onOpenLibItem,onEditWorkout}){
  const lang=useLang(); const t=T[lang]; const C=useC();
  if(!dayWorkouts||dayWorkouts.length===0) return null;
  const d=localDate(dayWorkouts[0].date);
  const wdLabel=lang==="zh"?WEEKDAY_CN[d.getDay()]:WEEKDAYS[d.getDay()].slice(0,3);
  const allMGs=[...new Set(dayWorkouts.flatMap(w=>w.muscleGroups))];
  return(
    <div style={{flex:1,overflowY:"auto",background:C.bg}}>
      {/* Header */}
      <div style={{padding:"8px 16px 14px",background:C.card,borderBottom:`1px solid ${C.sep}`,display:"flex",alignItems:"center",gap:8}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 0",color:C.blue,fontSize:16,fontWeight:500,flexShrink:0}}>{t.detailBack}</button>
        <div style={{flex:1,textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:600,color:C.text}}>{d.getMonth()+1}/{d.getDate()} {wdLabel}</div>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:4,flexWrap:"wrap"}}>
            {allMGs.map(mg=>(
              <span key={mg} style={{fontSize:12,fontWeight:500,color:C.indigo,background:`${C.indigo}12`,borderRadius:6,padding:"2px 8px"}}>
                {lang==="en"?MG_EN[mg]||mg:mg}
              </span>
            ))}
          </div>
        </div>
        <div style={{width:46}}/>
      </div>
      <div style={{padding:"16px"}}>
        {dayWorkouts.map((workout,wi)=>(
          <div key={workout.id}>
            {dayWorkouts.length>1&&(
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,marginTop:wi>0?8:0}}>
                <div style={{height:1,flex:1,background:C.sep}}/>
                <span style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4}}>
                  {lang==="zh"?`第 ${wi+1} 次訓練`:`Session ${wi+1}`}
                </span>
                <div style={{height:1,flex:1,background:C.sep}}/>
              </div>
            )}
            {workout.exercises.map((ex,i)=>{
              const it=library.find(l=>l.id===ex.libId);
              if(!it) return(
                <Card key={i} style={{marginBottom:12}}>
                  <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:C.label,flexShrink:0}}/>
                    <span style={{fontSize:15,color:C.label,fontStyle:"italic"}}>{lang==="en"?"(Exercise deleted)":"（此動作已從動作庫刪除）"}</span>
                  </div>
                </Card>
              );
              return(
                <Card key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px 12px"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:it.color,flexShrink:0}}/>
                    <span style={{flex:1,fontSize:17,fontWeight:700,color:C.text}}>{it.name}</span>
                    <button onClick={()=>onOpenLibItem(it.id)} style={{background:`${it.color}15`,border:"none",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600,color:it.color,cursor:"pointer"}}>{t.detailLibBtn}</button>
                  </div>
                  {ex.equipment&&(<><Div/><div style={{padding:"10px 16px"}}><div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:4}}>{t.detailEquip}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{ex.equipment}</div></div></>)}
                  <Div/>
                  <div style={{padding:"10px 16px"}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:10}}>{t.detailSets}</div>
                    {ex.weightSets.map((ws,wi2)=>(
                      <div key={wi2} style={{marginBottom:10}}>
                        <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:5}}>{ws.weight}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6,paddingLeft:4}}>
                          {ws.reps.map((r,ri)=>(<div key={ri} style={{background:C.f5,borderRadius:8,padding:"6px 14px",fontSize:15,fontWeight:600,color:C.text}}>{r}<span style={{fontSize:11,color:C.label,marginLeft:1}}>{t.repsUnit}</span></div>))}
                          <div style={{display:"flex",alignItems:"center",padding:"0 6px",fontSize:13,color:C.label}}>{t.totalReps} {ws.reps.reduce((a,b)=>a+b,0)} {t.repsUnit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {it.note&&(<><Div/><div style={{padding:"10px 16px"}}><div style={{fontSize:11,fontWeight:600,color:C.label,letterSpacing:0.4,marginBottom:2}}>{t.detailKnowledge}</div><div style={{fontSize:10,color:C.label,marginBottom:6}}>{t.detailKnowledgeSub}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.7,whiteSpace:"pre-wrap",background:C.f3,borderRadius:10,padding:"10px 12px"}}>{it.note}</div></div></>)}
                  {ex.feeling&&(<><Div/><div style={{padding:"10px 16px 14px"}}><div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:0.4,marginBottom:2}}>{t.detailFeeling}</div><div style={{fontSize:13,color:C.sub,lineHeight:1.7,whiteSpace:"pre-wrap",background:`${C.orange}08`,border:`1px solid ${C.orange}25`,borderRadius:10,padding:"10px 12px"}}>{ex.feeling}</div></div></>)}
                </Card>
              );
            })}
            <button onClick={()=>onEditWorkout(workout.id)}
              style={{width:"100%",padding:"16px",background:C.blue,border:"none",borderRadius:16,color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:16,boxShadow:`0 4px 16px ${C.blue}40`}}>
              {t.detailEdit}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  localStorage helpers
// ═══════════════════════════════════════════════════════
function lsGet(key, fallback){
  try{
    const v=localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch(e){ return fallback; }
}
function lsSet(key, value){
  // 用 setTimeout 讓 localStorage 寫入在畫面渲染完成後才執行
  // 避免阻塞主執行緒導致 UI freeze
  setTimeout(()=>{
    try{ localStorage.setItem(key, JSON.stringify(value)); }
    catch(e){ console.warn("localStorage write failed:", e); }
  }, 0);
}

// ═══════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════
export default function App(){
  const [tab,      setTab]      =useState("home");
  const [prevTab,  setPrevTab]  =useState("home");
  const navigate=(newTab)=>{ setPrevTab(tab); setTab(newTab); };
  const [workouts, setWorkouts] =useState(()=>lsGet("wt_workouts", INIT_WORKOUTS));
  const [library,  setLibrary]  =useState(()=>lsGet("wt_library",  INIT_LIBRARY));
  const [detailId, setDetailId] =useState(null);
  const [detailDate,setDetailDate]=useState(null);
  const [libItemId,setLibItemId]=useState(null);
  const [lang,     setLang]     =useState(()=>lsGet("wt_lang", "zh"));
  const [darkMode, setDarkMode] =useState(()=>lsGet("wt_dark", false));
  const [toast,    setToast]    =useState(null);
  const theme=darkMode?DARK:LIGHT;
  const detailWorkout=workouts.find(w=>w.id===detailId)||null;

  useEffect(()=>{ lsSet("wt_workouts", workouts); }, [workouts]);
  useEffect(()=>{ lsSet("wt_library",  library);  }, [library]);
  useEffect(()=>{ lsSet("wt_lang",     lang);     }, [lang]);
  useEffect(()=>{ lsSet("wt_dark",     darkMode); }, [darkMode]);

  const showToast=(msg)=>{
    setToast(msg);
    setTimeout(()=>setToast(null), 2500);
  };

  const handleSave=(workout,noteUpdates)=>{
    // 用函數式更新確保 React 能正確 batch 所有狀態變更
    setWorkouts(p=>[workout,...p]);
    setLibrary(p=>p.map(item=>{
      const noteUpd=noteUpdates.find(u=>u.libId===item.id);
      const usedEx=workout.exercises.find(ex=>ex.libId===item.id);
      if(!usedEx&&!noteUpd) return item;
      return{
        ...item,
        note: noteUpd ? noteUpd.note : item.note,
        history: usedEx
          ? [...item.history,{date:workout.date,workoutId:workout.id,equipment:usedEx.equipment,weightSets:usedEx.weightSets,feeling:usedEx.feeling}]
          : item.history,
      };
    }));
    // tab 切換和 toast 延遲到下一個 tick，讓上面的狀態先完成渲染
    setTimeout(()=>{
      setTab("home");
      showToast(T[lang].savedAlert);
    }, 0);
  };

  const openLibItem=(id)=>{setLibItemId(id);setTab("library");};
  const handleUpdateWorkout=(updated)=>setWorkouts(p=>p.map(w=>w.id===updated.id?updated:w));
  const handleDeleteWorkout=(id)=>setWorkouts(p=>p.filter(w=>w.id!==id));
  const openDayDetail=(date)=>{setDetailDate(date);navigate("daydetail");};
  const handleEditWorkout=(id)=>{setDetailId(id);navigate("detail");};
  const handleImport=(newWorkouts,newLibrary)=>{
    setWorkouts(newWorkouts);
    setLibrary(newLibrary);
    showToast(lang==="zh"?"✅ 資料已成功匯入！":"✅ Data imported successfully!");
  };
  const isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return(
    <DarkCtx.Provider value={darkMode}>
      <LangCtx.Provider value={lang}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100dvh",
          background:isMobile?theme.bg:"#1C1C1E",
          fontFamily:"-apple-system,'SF Pro Text','Helvetica Neue',sans-serif"}}>
          <div style={isMobile?{
            width:"100%",height:"100dvh",background:theme.card,
            display:"flex",flexDirection:"column",overflow:"hidden",
          }:{
            width:393,height:852,background:theme.card,borderRadius:52,
            overflow:"hidden",display:"flex",flexDirection:"column",position:"relative",
            boxShadow:"0 0 0 1px rgba(255,255,255,0.1),0 0 0 10px #2C2C2E,0 0 0 11px rgba(255,255,255,0.07),0 40px 100px rgba(0,0,0,0.7)",
          }}>
            {!isMobile&&<StatusBar/>}
            {/* Toast 通知 */}
            {toast&&(
              <div style={{position:"absolute",top:60,left:"50%",transform:"translateX(-50%)",
                background:"rgba(0,0,0,0.82)",color:"#fff",borderRadius:20,padding:"10px 20px",
                fontSize:14,fontWeight:500,zIndex:400,whiteSpace:"nowrap",
                boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>
                {toast}
              </div>
            )}
            <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:theme.bg}}>
              {tab==="detail"
                ?<DetailTab
                    workout={detailWorkout}
                    library={library}
                    onBack={()=>setTab(prevTab)}
                    onOpenLibItem={openLibItem}
                    onUpdateWorkout={handleUpdateWorkout}
                    onDeleteWorkout={(id)=>{
                      handleDeleteWorkout(id);
                      // 刪除後，若當天還有其他訓練回 daydetail，否則直接回 history
                      const remaining=workouts.filter(w=>w.id!==id&&w.date===detailDate);
                      setTab(remaining.length>0?"daydetail":"history");
                    }}/>
              :tab==="daydetail"
                ?<DayDetailTab
                    dayWorkouts={workouts.filter(w=>w.date===detailDate)}
                    library={library}
                    onBack={()=>setTab("history")}
                    onOpenLibItem={openLibItem}
                    onEditWorkout={handleEditWorkout}/>
              :tab==="log"
                ?<LogTab library={library} onSave={handleSave} showToast={showToast}/>
              :tab==="history"
                ?<HistoryTab workouts={workouts} library={library} onOpenDay={openDayDetail}/>
              :tab==="library"
                ?<LibraryTab library={library} setLibrary={setLibrary} openItemId={libItemId} setOpenItemId={setLibItemId}/>
              :tab==="about"
                ?<AboutTab workouts={workouts} library={library} onImport={handleImport}/>
              :<HomeTab workouts={workouts} library={library} setTab={navigate} lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode} openDayDetail={openDayDetail}/>}
            </div>
            {tab!=="detail"&&tab!=="daydetail"&&<BottomNav tab={tab} setTab={setTab}/>}
          </div>
        </div>
      </LangCtx.Provider>
    </DarkCtx.Provider>
  );
}
