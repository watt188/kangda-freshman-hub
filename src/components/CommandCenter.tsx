"use client";

import { useEffect, useMemo, useState } from "react";

const commands = [
  { label: "Course Intelligence", hint: "课程冲突 · 选课计划", target: "planner", key: "C" },
  { label: "Medical Word Engine", hint: "100 个医学构词单位", target: "words", key: "W" },
  { label: "Resource Library", hint: "新生指南 · PDF", target: "resources", key: "R" },
  { label: "Experimental Lab", hint: "正在构建的项目", target: "lab", key: "L" },
];

export default function CommandCenter() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 1250);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setOpen(v => !v);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKey); };
  }, []);

  const filtered = useMemo(() => commands.filter(item => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const go = (target: string) => { setOpen(false); document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }); };

  return <>
    <div className={`boot-screen ${booted ? "boot-done" : ""}`} aria-hidden="true">
      <div className="boot-mark">K / 26</div><div className="boot-line"/><p>INITIALIZING FRESHMAN OS</p>
    </div>
    <button className="command-trigger" onClick={() => setOpen(true)} aria-label="打开全站命令中心"><span>⌘</span> K <em>COMMAND</em></button>
    {open && <div className="command-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="command-panel" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command Center">
        <div className="command-input-row"><span>⌕</span><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Kangda / 26…"/><kbd>ESC</kbd></div>
        <div className="command-caption">NAVIGATE SYSTEM</div>
        <div className="command-list">{filtered.map(item => <button key={item.target} onClick={() => go(item.target)}><span><strong>{item.label}</strong><small>{item.hint}</small></span><kbd>{item.key}</kbd></button>)}</div>
        <div className="command-footer"><span>2026 FRESHMAN BUILD</span><span>EXPERIMENTAL INTERFACE</span></div>
      </div>
    </div>}
  </>;
}
