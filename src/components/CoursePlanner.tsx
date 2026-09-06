"use client";

export default function CoursePlanner() {
  return (
    <div className="planner-shell">
      <section className="planner-panel">
        <div className="planner-head">
          <span>V1.2 / DATA RECALIBRATION</span>
          <h3>选课助手正在校正</h3>
        </div>
        <div className="planner-note">
          已删除旧的“预防医学 / 专业外课程”推荐模型。
          V1.2 将仅使用 2026 级实际可选的通识教育选修课程，
          并以临床医学 1 班课表进行周次 × 星期 × 节次冲突检测。
        </div>
      </section>
    </div>
  );
}
