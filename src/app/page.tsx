import WordExplorer from "@/components/WordExplorer";
import CoursePlanner from "@/components/CoursePlanner";

export default function Home() {
  return <>
    <header className="site-header"><a className="brand" href="#top">KANGDA / 2026</a><nav><a href="#resources">资料</a><a href="#planner">选课助手</a><a href="#words">100词</a><a href="#about">关于</a></nav></header>
    <main id="top">
      <section className="hero"><div className="eyebrow">FRESHMAN STARTER KIT · V1.1</div><h1>康大新生<br/>资料库</h1><p className="lede">不是网盘资料堆，而是一张可以真正开始使用的大学学习地图。</p><div className="hero-actions"><a className="button primary" href="#resources">开始浏览</a><a className="button" href="#words">医学英语 100 词</a></div><p className="micro">2026级同学个人整理 · 免费分享 · 持续更新 · 非康复大学官方资料</p></section>
      <section className="metrics"><div><strong>02</strong><span>首发资料</span></div><div><strong>100</strong><span>医学构词单位</span></div><div><strong>07</strong><span>本科专业地图</span></div><div><strong>V1.1</strong><span>当前版本</span></div></section>
      <section id="resources" className="section"><div className="section-kicker">01 / RESOURCE LIBRARY</div><h2>先从两份核心资料开始</h2><div className="grid two">
        <article className="card featured"><div className="num">01</div><h3>康大新生学习指南 2026</h3><p>从大学学习系统、医学启蒙、英语、科研、AI，到康大七专业地图。</p><div className="meta">24 PAGES · START HERE</div><a className="button" href="/downloads/kangda-freshman-guide-2026.pdf" target="_blank" rel="noopener noreferrer">打开学习指南</a></article>
        <article className="card"><div className="num">02</div><h3>Medical Word Builder 100</h3><p>100个医学英语高频词根词缀，配拆词、例词、易混淆项和7天学习计划。</p><div className="meta">100 TERMS · INTERACTIVE</div><div className="resource-actions"><a className="button" href="#words">打开互动词卡</a><a className="button secondary" href="/downloads/medical-word-builder-100.pdf" target="_blank" rel="noopener noreferrer">PDF版</a></div></article>
      </div></section>
      <section id="planner" className="section planner-section"><div className="section-kicker">02 / COURSE PLANNER · V1.1</div><h2>康大选课助手</h2><p className="section-intro">录入真实课程，生成 A / B / C 方案，再按名额紧张度输出选课顺序。先做决定，再去抢课。</p><CoursePlanner/></section>
      <section id="words" className="section alt"><div className="section-kicker">03 / MEDICAL WORD BUILDER</div><h2>医学英语 100 词</h2><p className="section-intro">搜索一个词根、系统或例词。先尝试自己判断，再翻开答案。</p><WordExplorer/></section>
      <section className="section"><div className="section-kicker">04 / HOW TO READ</div><h2>5分钟拆医学单词</h2><div className="steps"><div><b>01</b><span>先看后缀</span><p>-itis 炎症，-ectomy 切除术。</p></div><div><b>02</b><span>再看前缀</span><p>hyper- 过高，hypo- 不足。</p></div><div><b>03</b><span>找核心词根</span><p>cardi/o 心脏，neur/o 神经。</p></div><div><b>04</b><span>组合成自然含义</span><p>不要机械逐字翻译。</p></div><div><b>05</b><span>回权威来源核验</span><p>构词法帮助推断，不替代医学定义。</p></div></div></section>
      <section id="about" className="section dark"><div className="section-kicker">05 / ABOUT</div><h2>欢迎来到大学。</h2><p className="bigquote">别急着证明自己，先建立自己的方向。</p><p>这个资料库由2026级同学个人整理。学校通知、培养方案、课程与招生信息，以康复大学官方最新发布为准。</p></section>
    </main>
    <footer><span>KANGDA / 2026</span><span>FREE · CURATED · CONTINUOUSLY UPDATED</span></footer>
  </>;
}
