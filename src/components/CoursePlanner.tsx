"use client";

import { useMemo, useState } from "react";
import {
  courseCatalog,
  remaining,
  sectionConflictsWithClinical1,
  sectionsConflict,
  weekdayName,
  type Course,
  type Section,
} from "@/data/courseCatalog";

type Option = {
  course: Course;
  section: Section;
  conflictWithClass: boolean;
};

const optionId = (o: Option) => `${o.course.id}:${o.section.id}`;

const meetingText = (s: Section) =>
  s.meetings
    .map((m) => `星期${weekdayName(m.weekday)} 第${m.periods[0]}-${m.periods[1]}节${m.room ? ` · ${m.room}` : ""}`)
    .join("；");

const score = (o: Option) => {
  const preferred =
    o.course.id === "brain" ? 100 :
    o.course.id === "bme-english" ? 96 :
    o.course.id === "lab-safety" ? 78 :
    60;
  const seatRatio = remaining(o.section) / o.section.capacity;
  return preferred + seatRatio * 20 - (o.conflictWithClass ? 1000 : 0);
};

export default function CoursePlanner() {
  const [showOnlyFit, setShowOnlyFit] = useState(true);

  const options = useMemo<Option[]>(
    () =>
      courseCatalog.flatMap((course) =>
        course.sections.map((section) => ({
          course,
          section,
          conflictWithClass: sectionConflictsWithClinical1(section),
        })),
      ),
    [],
  );

  const brain = options.find((x) => x.course.id === "brain")!;
  const englishWed = options.find(
    (x) => x.course.id === "bme-english" && x.section.id === "002",
  )!;
  const englishTue = options.find(
    (x) => x.course.id === "bme-english" && x.section.id === "003",
  )!;
  const lifeDesign = options.find((x) => x.course.id === "life-design")!;
  const labSafety = options.find((x) => x.course.id === "lab-safety")!;

  const visible = [...options]
    .filter((x) => !showOnlyFit || !x.conflictWithClass)
    .sort((a, b) => score(b) - score(a));

  const abc = {
    A: [brain, englishWed],
    B: [brain, labSafety],
    C: [englishWed, labSafety],
  };

  const battle = [brain, englishWed, labSafety]
    .filter(Boolean)
    .sort((a, b) => {
      const ra = remaining(a.section);
      const rb = remaining(b.section);
      if (ra !== rb) return ra - rb;
      return score(b) - score(a);
    });

  return (
    <div className="planner-shell">
      <div className="planner-note">
        <b>当前画像：</b>2026级临床医学1班。V1.2 只处理你今天截图里确认的
        通识教育选修课。推荐目标为 <b>3 学分</b>：优先保住你最想学的
        “探索大脑奥秘” + “BME English Communication”。
      </div>

      <section className="planner-panel">
        <div className="planner-head planner-split">
          <div>
            <span>01 / CONFLICT ENGINE</span>
            <h3>冲突校验</h3>
          </div>
          <button
            className="button secondary"
            onClick={() => setShowOnlyFit((v) => !v)}
          >
            {showOnlyFit ? "显示全部课程" : "只看无课表冲突"}
          </button>
        </div>

        <div className="planner-note">
          <b>关键校正：</b>
          BME English Communication 002 为星期三第9-10节，可保留；
          003 为星期二第9-10节，与临床医学1班“人工智能导论（实验）”
          在第9-12周冲突，因此不推荐。生命的设计与复刻与探索大脑奥秘
          都占星期四第9-10节，二者在第9-16周互相冲突。
        </div>

        <div className="course-list">
          {visible.map((o) => {
            const withBrain =
              o.course.id !== "brain" &&
              sectionsConflict(o.section, brain.section);
            return (
              <article
                className={`course-row ${o.conflictWithClass ? "course-muted" : ""}`}
                key={optionId(o)}
              >
                <div>
                  <span>
                    {o.course.module} · {o.course.code} · 教学班 {o.section.label}
                  </span>
                  <strong>{o.course.name}</strong>
                  <small>
                    {o.course.credits} 学分 · {o.course.hours} 学时 · {meetingText(o.section)}
                  </small>
                  {o.conflictWithClass && <em className="risk-chip">与临床1班必修课冲突</em>}
                  {withBrain && <em className="risk-chip">与“探索大脑奥秘”冲突</em>}
                </div>
                <div className="seat-box">
                  <span>截图余量</span>
                  <b>剩 {remaining(o.section)}</b>
                  <span>{o.section.enrolled}/{o.section.capacity}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="planner-panel">
        <div className="planner-head">
          <span>02 / PERSONAL PLAN</span>
          <h3>临床医学1班 · A / B / C</h3>
        </div>

        <div className="plan-grid">
          {Object.entries(abc).map(([tier, list]) => {
            const credits = list.reduce((s, x) => s + x.course.credits, 0);
            return (
              <div className="plan-card" key={tier}>
                <div className="plan-title">
                  <b>{tier}</b>
                  <span>
                    {tier === "A" ? "首选方案" : tier === "B" ? "替代方案" : "保底方案"}
                  </span>
                </div>
                <div className="plan-credit">{credits} 学分</div>
                {list.map((o) => (
                  <div className="plan-item" key={optionId(o)}>
                    <strong>{o.course.name}</strong>
                    <span>教学班 {o.section.label} · 剩 {remaining(o.section)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <p className="planner-footnote">
          A 方案是当前最贴合你的组合：探索大脑奥秘 2 学分 +
          BME English Communication 002 1 学分，共 3 学分。
          003 虽然同名，但星期二第9-10节与必修实验冲突，不作为备选。
        </p>
      </section>

      <section className="planner-panel">
        <div className="planner-head">
          <span>03 / BATTLE ORDER</span>
          <h3>实际抢课顺序</h3>
        </div>

        <div className="battle-list">
          {battle.map((o, i) => (
            <div className="battle-row" key={optionId(o)}>
              <div className="battle-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="battle-course">
                <small>教学班 {o.section.label}</small>
                <strong>{o.course.name}</strong>
                <span>{meetingText(o.section)} · {o.course.credits} 学分</span>
              </div>
              <div className="battle-seat">
                <small>截图余量</small>
                <b>剩 {remaining(o.section)}</b>
                {i < 2 && <em>优先操作</em>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="planner-panel">
        <div className="planner-head">
          <span>04 / EXCLUSIONS</span>
          <h3>当前明确排除</h3>
        </div>
        <div className="planner-note">
          <b>排除 1：</b>{englishTue.course.name} 003 —— 星期二第9-10节，与人工智能导论实验冲突。
          <br />
          <b>排除 2：</b>{lifeDesign.course.name} —— 若已选探索大脑奥秘，则同为星期四第9-10节，不能同时保留。
          <br />
          <b>说明：</b>名额采用你今天截图中的当前值，真正选课时仍以教务系统实时余量为准。
        </div>
      </section>
    </div>
  );
}
