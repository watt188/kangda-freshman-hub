"use client";

import { useMemo, useState } from "react";
import words from "@/data/words.json";

type Word = (typeof words)[number];

export default function WordExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [randomOnly, setRandomOnly] = useState<Word | null>(null);
  const categories = useMemo(() => [...new Set(words.map((word) => word["分类"]))], []);
  const filtered = useMemo(() => {
    if (randomOnly) return [randomOnly];
    const q = query.trim().toLowerCase();
    return words.filter((word) => {
      const matchesCategory = !category || word["分类"] === category;
      const haystack = Object.values(word).join(" ").toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [query, category, randomOnly]);

  function toggle(index: number) {
    setOpened((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function randomCard() {
    const item = words[Math.floor(Math.random() * words.length)];
    setRandomOnly(item);
    setOpened(new Set([Number(item["编号"])]));
  }

  return <>
    <div className="toolbar">
      <input aria-label="搜索医学英语词根" value={query} onChange={(e) => { setQuery(e.target.value); setRandomOnly(null); }} placeholder="搜索 cardi/o、心脏、gastritis…" />
      <select aria-label="按分类筛选" value={category} onChange={(e) => { setCategory(e.target.value); setRandomOnly(null); }}>
        <option value="">全部分类</option>{categories.map((c) => <option key={c}>{c}</option>)}
      </select>
      <button className="button" onClick={randomCard}>随机一张</button>
      {randomOnly && <button className="button secondary" onClick={() => setRandomOnly(null)}>返回全部</button>}
    </div>
    <div className="micro">显示 {filtered.length} / {words.length} 项 · 点击卡片翻开答案</div>
    <div className="word-grid">
      {filtered.map((word) => {
        const id = Number(word["编号"]);
        const isOpen = opened.has(id);
        return <button key={`${id}-${word["构词单位"]}`} type="button" className={`word-card${isOpen ? " open" : ""}`} onClick={() => toggle(id)}>
          <span className="tag">{word["分类"]}</span>
          <span className="term">{word["构词单位"]}</span>
          <span className="meaning">{word["核心含义"]}</span>
          <span className="answer"><b>{word["典型例词"]}</b> · {word["整词含义"]}<br/><span>{word["单词拆解"]}</span><br/><span>{word["记忆提示"]}</span></span>
        </button>;
      })}
    </div>
  </>;
}
