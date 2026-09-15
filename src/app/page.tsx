import WordExplorer from "@/components/WordExplorer";
import CoursePlanner from "@/components/CoursePlanner";
import CommandCenter from "@/components/CommandCenter";

const modules = [
  ["01", "COURSE INTELLIGENCE", "把课程、时间冲突与学分计划放进一个决策界面。", "#planner", "ACTIVE"],
  ["02", "MEDICAL WORD ENGINE", "从 100 个高频构词单位开始建立医学英语识别能力。", "#words", "ACTIVE"],
  ["03", "RESOURCE LIBRARY", "新生学习指南与可下载资料，不做无序网盘堆积。", "#resources", "ONLINE"],
  ["04", "EXPERIMENTAL LAB", "把校园里的真实问题，持续做成可以交互的数字实验。", "#lab", "BUILDING"],
];

export default function Home() {
  return <>
    <CommandCenter/>
    <header className="os-nav"><a className="os-brand" href="#top"><i/>KANGDA / 26</a><nav><a href="#systems">SYSTEMS</a><a href="#lab">LAB</a><a href="#about">ABOUT</a></nav><span className="nav-status"><b/>SYSTEM ONLINE</span></header>
    <main id="top">
      <section className="os-hero">
        <div className="hero-grid"/><div className="hero-orb"/>
        <div className="hero-copy"><div className="eyebrow"><span>FRESHMAN OS</span><b>V2.0 / EXPERIMENTAL</b></div><h1>BUILD YOUR<br/><em>FIRST YEAR.</em></h1><p>一个由 2026 级学生独立构建、持续进化的康大新生数字工具站。</p><div className="hero-actions"><a className="button primary" href="#systems">ENTER SYSTEM</a><a className="button ghost" href="#lab">VIEW LAB ↗</a></div></div>
        <div className="hero-console"><div className="console-head"><span>LIVE CONSOLE</span><span>● READY</span></div><p><i>01</i> COURSE DATA <b>INDEXED</b></p><p><i>02</i> CONFLICT ENGINE <b>ACTIVE</b></p><p><i>03</i> MEDICAL WORDS <b>100 UNITS</b></p><p><i>04</i> NEXT EXPERIMENT <b>LOADING…</b></p><div className="scanline"/></div>
        <div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="signal-strip"><span>INDEPENDENT BUILD</span><span>2026 FRESHMAN</span><span>DESIGN × CODE × MEDICINE</span><span>CONTINUOUSLY UPDATED</span></section>

      <section id="systems" className="section systems"><div className="section-top"><div><div className="section-kicker">01 / COMMAND CENTER</div><h2>Four systems.<br/>One starting point.</h2></div><p>不是把功能塞满屏幕，而是把目前真正能运行的东西做得清晰、快速、有记忆点。</p></div><div className="system-grid">{modules.map(([n,title,desc,href,status]) => <a className="system-card" href={href} key={title}><div className="system-card-top"><span>{n}</span><b className={`status ${status === "BUILDING" ? "building" : ""}`}>{status}</b></div><h3>{title}</h3><p>{desc}</p><div className="system-arrow">OPEN SYSTEM <b>↗</b></div></a>)}</div></section>

      <section id="planner" className="section planner-section os-panel"><div className="panel-label"><span>02 / COURSE INTELLIGENCE</span><b>ENGINE · ACTIVE</b></div><div className="section-top"><div><h2>选课，不靠猜。</h2><p className="section-intro">基于目前已录入的 2026 通识选修课与临床医学1班课表做冲突判断、学分组合和抢课顺序。没有录入的数据，不伪装成“实时”。</p></div><div className="engine-badge"><span>LOCAL DATA</span><strong>DECISION<br/>ENGINE</strong></div></div><CoursePlanner/></section>

      <section id="resources" className="section"><div className="section-kicker">03 / RESOURCE LIBRARY</div><div className="section-top"><h2>Useful first.<br/>More later.</h2><p>只把已经整理完成的资料放进系统。未来的模块宁可标记 Building，也不用虚构数据填满界面。</p></div><div className="resource-deck"><article><span>START / 01</span><h3>康大新生学习指南 2026</h3><p>大学学习系统、医学启蒙、英语、科研、AI 与专业地图。</p><a className="button" href="/downloads/kangda-freshman-guide-2026.pdf" target="_blank">OPEN GUIDE ↗</a></article><article><span>ENGINE / 02</span><h3>Medical Word Builder 100</h3><p>100 个医学英语高频词根词缀与互动词卡。</p><a className="button" href="#words">LAUNCH ENGINE ↓</a></article></div></section>

      <section id="words" className="section os-panel"><div className="panel-label"><span>04 / MEDICAL WORD ENGINE</span><b>100 UNITS · READY</b></div><h2>Decode medical language.</h2><p className="section-intro">搜索词根、系统或例词。把医学英语从“背单词”变成可拆解的结构。</p><WordExplorer/></section>

      <section id="lab" className="section lab-section"><div className="section-kicker">05 / EXPERIMENTAL LAB</div><h2>Things I&apos;m building.</h2><div className="lab-list"><div><span>001</span><strong>COURSE INTELLIGENCE</strong><em>SHIPPED</em></div><div><span>002</span><strong>MEDICAL WORD ENGINE</strong><em>SHIPPED</em></div><div><span>003</span><strong>ANATOMY ATLAS</strong><em>PROTOTYPING</em></div><div><span>004</span><strong>CAMPUS AI</strong><em>RESEARCHING</em></div><div className="lab-next"><span>005</span><strong>NEXT EXPERIMENT</strong><em>???</em></div></div></section>

      <section id="about" className="section about-os"><div className="about-code">K / 26</div><div><div className="section-kicker">06 / ABOUT THIS BUILD</div><h2>Build in public.<br/>Learn by shipping.</h2><p>这是 2026 级学生个人开发项目，不代表康复大学官方。课程、培养方案和学校通知请始终以官方最新发布为准。</p><p className="about-note">目标不是假装拥有所有答案，而是把已经掌握的信息做成更好的工具，然后一版一版继续构建。</p></div></section>
    </main>
    <footer className="os-footer"><span>KANGDA / 26 · FRESHMAN OS</span><span>INDEPENDENT STUDENT PROJECT</span><span>2026 → ∞</span></footer>
  </>;
}
