export type Status = "open" | "full" | "anomaly" | "unknown";

export type Meeting = {
  weeks: string;
  weekday: string;
  periods: string;
  room?: string;
};

export type Section = {
  id: string;
  label: string;
  teacher?: string;
  capacity?: number;
  enrolled?: number;
  meetings: Meeting[];
};

export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  hours: number;
  category: "通识教育选修课程";
  sections: Section[];
  note?: string;
};

export const courseCatalog: Course[] = [];

export const statusOf = (x: Section): Status =>
  x.capacity == null || x.enrolled == null
    ? "unknown"
    : x.enrolled > x.capacity
      ? "anomaly"
      : x.enrolled >= x.capacity
        ? "full"
        : "open";

export const remaining = (x: Section) =>
  x.capacity == null || x.enrolled == null
    ? null
    : Math.max(0, x.capacity - x.enrolled);
