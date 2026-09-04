"use client";

import { useEffect, useMemo, useState } from "react";

type Tier = "A" | "B" | "C" | "";
type CourseType = "通识选修课" | "体育课" | "专业外课程";
type Course = {
  id: string; name: string; type: CourseType; module: string; credits: number;
  teacher: string; time: string; capacity: number; remaining: number;
  conflict: boolean; value: number; interest: number; relevance: number; tier: Tier;
};

const KEY = "kangda-v1.1-courses";
const blank = (): Course => ({
  id: crypto.randomUUID(), name: "", type: "通识选修课", module: "", credits: 1,
  teacher: "", time: "", capacity: 0, remaining: 0, conflict: false,
  value: 3, interest: 3, relevance: 3, tier: ""
});
const urgency = (c: Course) => c.capacity > 0 ? Math.max(0, 5 - (c.remaining / c.capacity) * 5) : 0;
const score = (c: Course) => c.value*.35 + c.interest*.20 + c.relevance*.20 + Math.min(5,Math.max(1,c.credits))*.10 + urgency(c)*.15;
const autoTier = (c: Course): Tier => {
  if (c.conflict || (c.capacity > 0 && c.remaining <= 0)) return "";
  const s = score(c); return s >= 3.9 ? "A" : s >= 3.1 ? "B" : "C";
};

export default function CoursePlanner() {
  const [courses,setCourses] = useState<Course[]>([]);
  const [draft,setDraft] = useState<Course>(blank());
  const [target,setTarget] = useState(2);

  useEffect(()=>{ try { const s=localStorage.getItem(KEY); if(s) setCourses(JSON.parse(s)); } catch {} },[]);
  useEffect(()=>{ localStorage.setItem(KEY,JSON.stringify(courses)); },[courses]);

  const normalized = useMemo(()=>courses.map(c=>({...c,tier:c.tier||autoTier(c)})),[courses]);
  const plans = useMemo(()=>{
    const pick=(t:Tier)=>normalized.filter(c=>c.tier===t&&!c.conflict&&!(c.capacity>0&&c.remaining<=0)).sort((a,b)=>score(b)-score(a));
    return {A:pick("A"),B:pick("B"),C:pick("C")};
  },[normalized]);
  const execution = useMemo(()=>{
    const w:Record<string,number>={A:3,B:2,C:1};
    return [...normalized].filter(c=>c.tier&&!c.conflict&&!(c.capacity>0&&c.remaining<=0)).sort((a,b)=>{
      if(w[b.tier]-w[a.tier]) return w[b.tier]-w[a.tier];
      const ar=a.capacity? a.remaining/a.capacity:1, br=b.capacity? b.remaining/b.capacity:1;
      return ar!==br ? ar-br : score(b)-score(a);
    });
  },[normalized]);

  const add=()=>{
    if(!draft.name.trim()) return;
    setCourses(x=>[...x,{...draft,name:draft.name.trim(),teacher:draft.teacher.trim(),time:draft.time.trim(),module:draft.module.trim()}]);
    setDraft(blank());
  };
  const tier=(id:string,t:Tier)=>setCourses(x=>x.map(c=>c.id===id?{...c,tier:t}:c));
  const remove=(id:string)=>setCourses(x=>x.filter(c=>c.id!==id));
  const credits=(arr:Course[])=>arr.reduce((s,c)=>s+c.credits,0);

  return <div className="planner-shell">
    <div className="planner-note"><b>真实数据原则：</b>这里只录入你在教务系统实际看到的课程，不预填未公布课程。最终以学校教务系统为准。</div>

    <section className="planner-panel">
      <div className="planner-head"><span>01 / COURSE ENTRY</span><h3>录入课程</h3></div>
      <div className="course-form">
        <label>课程名称<input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} placeholder="课程名称"/></label>
        <label>类型<select value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value as CourseType})}><option>通识选修课</option><option>体育课</option><option>专业外课程</option></select></label>
        <label>模块<input value={draft.module} onChange={e=>setDraft({...draft,module:e.target.value})} placeholder="六模块中的所属模块"/></label>
        <label>学分<input type="number" step=".5" min="0" value={draft.credits} onChange={e=>setDraft({...draft,credits:+e.target.value})}/></label>
        <label>教师<input value={draft.teacher} onChange={e=>setDraft({...draft,teacher:e.target.value})}/></label>
        <label>上课时间<input value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})} placeholder="周一 3-4节"/></label>
        <label>容量<input type="number" min="0" value={draft.capacity} onChange={e=>setDraft({...draft,capacity:+e.target.value})}/></label>
        <label>剩余名额<input type="number" min="0" value={draft.remaining} onChange={e=>setDraft({...draft,remaining:+e.target.value})}/></label>
        <label>课程价值 0-5<input type="number" min="0" max="5" value={draft.value} onChange={e=>setDraft({...draft,value:+e.target.value})}/></label>
        <label>个人兴趣 0-5<input type="number" min="0" max="5" value={draft.interest} onChange={e=>setDraft({...draft,interest:+e.target.value})}/></label>
        <label>专业相关性 0-5<input type="number" min="0" max="5" value={draft.relevance} onChange={e=>setDraft({...draft,relevance:+e.target.value})}/></label>
        <label className="check-label"><input type="checkbox" checked={draft.conflict} onChange={e=>setDraft({...draft,conflict:e.target.checked})}/>与课表冲突</label>
      </div>
      <button className="button primary planner-add" onClick={add}>＋ 加入课程池</button>

      <div className="course-list">
        {!courses.length && <div className="empty-state">课程池为空。等系统出现真实课程后再录入。</div>}
        {courses.map(c=><article className="course-row" key={c.id}>
          <div><small>{c.type}{c.module?` · ${c.module}`:""}</small><strong>{c.name}</strong><span>{c.credits}学分 · {c.teacher||"教师待填"} · {c.time||"时间待填"}</span></div>
          <div className="seat-box"><small>剩余</small><b>{c.remaining}{c.capacity?` / ${c.capacity}`:""}</b></div>
          <div className="tier-actions">{(["A","B","C"] as Tier[]).map(t=><button className={c.tier===t?"active":""} key={t} onClick={()=>tier(c.id,t)}>{t}</button>)}<button onClick={()=>tier(c.id,"")}>自动</button><button onClick={()=>remove(c.id)}>×</button></div>
        </article>)}
      </div>
    </section>

    <section className="planner-panel">
      <div className="planner-head planner-split"><div><span>02 / PLAN</span><h3>生成 A / B / C 方案</h3></div><label>目标学分<input type="number" min="0" step=".5" value={target} onChange={e=>setTarget(+e.target.value)}/></label></div>
      <div className="plan-grid">
        {(["A","B","C"] as const).map(t=><div className="plan-card" key={t}>
          <div className="plan-title"><b>{t}</b><span>{t==="A"?"首选组合":t==="B"?"替代组合":"保底组合"}</span></div>
          <div className="plan-credit">{credits(plans[t])} / {target} 学分</div>
          {!plans[t].length?<p>暂无课程</p>:plans[t].map(c=><div className="plan-item" key={c.id}><strong>{c.name}</strong><span>{c.credits}学分 · 剩{c.remaining}{c.capacity?`/${c.capacity}`:""}</span></div>)}
        </div>)}
      </div>
      <p className="planner-footnote">自动分层：课程价值35% + 兴趣20% + 专业相关性20% + 学分效率10% + 名额紧张度15%。可手动覆盖 A/B/C。</p>
    </section>

    <section className="planner-panel">
      <div className="planner-head"><span>03 / BATTLE ORDER</span><h3>输出选课顺序</h3></div>
      {!execution.length?<div className="empty-state">录入课程后自动生成。</div>:<div className="battle-list">
        {execution.map((c,i)=>{ const low=c.capacity>0&&c.remaining/c.capacity<=.2; return <div className="battle-row" key={c.id}>
          <div className="battle-num">{String(i+1).padStart(2,"0")}</div>
          <div className="battle-course"><small>{c.tier} · {c.tier==="A"?"首选":c.tier==="B"?"替代":"保底"}</small><strong>{c.name}</strong><span>{c.time||"时间待填"} · {c.credits}学分</span></div>
          <div className="battle-seat"><small>剩余名额</small><b>{c.remaining}{c.capacity?` / ${c.capacity}`:""}</b>{low&&<em>优先操作</em>}</div>
        </div>})}
      </div>}
    </section>
  </div>;
}
