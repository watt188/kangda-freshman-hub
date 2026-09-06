export type Meeting = {
  weeks: number[];
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  periods: [number, number];
  room?: string;
};

export type Section = {
  id: string;
  label: string;
  teacher?: string;
  capacity: number;
  enrolled: number;
  meetings: Meeting[];
};

export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  hours: number;
  module: "理工类" | "社科类" | "医学类" | "艺术类";
  sections: Section[];
  note?: string;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const clinicalClass1Busy: Meeting[] = [
  // 这里只录入与当前通识选修冲突判断真正相关的已确认课表槽位。
  // 临床医学1班：人工智能导论（实验）5-12周，星期二第9-10节。
  { weeks: range(5, 12), weekday: 2, periods: [9, 10], room: "11-103（IT教学实训室）" },
];

export const courseCatalog: Course[] = [
  {
    id: "brain",
    code: "00031010N",
    name: "探索大脑奥秘：科学与生活的交融",
    credits: 2,
    hours: 32,
    module: "理工类",
    sections: [{
      id: "002",
      label: "002",
      capacity: 30,
      enrolled: 0,
      meetings: [{ weeks: range(3, 18), weekday: 4, periods: [9, 10], room: "2-126" }],
    }],
    note: "用户明确偏好；与临床医学1班当前已确认必修课无冲突。",
  },
  {
    id: "bme-english",
    code: "00031013N",
    name: "BME English Communication",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [
      {
        id: "002",
        label: "002",
        teacher: "Henry Hongsuk Shin",
        capacity: 30,
        enrolled: 0,
        meetings: [{ weeks: range(9, 16), weekday: 3, periods: [9, 10], room: "10-204" }],
      },
      {
        id: "003",
        label: "003",
        teacher: "Henry Hongsuk Shin",
        capacity: 30,
        enrolled: 0,
        meetings: [{ weeks: range(9, 16), weekday: 2, periods: [9, 10], room: "10-107" }],
      },
    ],
    note: "用户明确偏好；002为星期三，003为星期二。003与临床医学1班人工智能导论实验在9-12周冲突。",
  },
  {
    id: "antibody",
    code: "00031017N",
    name: "抗体工程与药物",
    credits: 2,
    hours: 32,
    module: "理工类",
    sections: [{
      id: "001",
      label: "001",
      capacity: 30,
      enrolled: 20,
      meetings: [
        { weeks: [9,10,11,12,13,14,15,16], weekday: 1, periods: [9, 10], room: "10-107" },
        { weeks: [9,10,11,12,13,14], weekday: 6, periods: [9, 10], room: "10-107" },
      ],
    }],
  },
  {
    id: "rehab-robot-research",
    code: "00031019N",
    name: "智能康复机器人高级科研训练与论文写作",
    credits: 2,
    hours: 32,
    module: "理工类",
    sections: [{
      id: "001",
      label: "001",
      teacher: "刘阳",
      capacity: 30,
      enrolled: 17,
      meetings: [{ weeks: range(1, 16), weekday: 1, periods: [9, 10], room: "10-208" }],
    }],
  },
  {
    id: "soft-matter",
    code: "00031020N",
    name: "软物质：物理化学到康复医用",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [{
      id: "002",
      label: "002",
      teacher: "王伟杰",
      capacity: 60,
      enrolled: 0,
      meetings: [{ weeks: range(9, 16), weekday: 2, periods: [9, 10], room: "10-208" }],
    }],
  },
  {
    id: "drug-health",
    code: "00021010N",
    name: "药与健康",
    credits: 1,
    hours: 16,
    module: "社科类",
    sections: [{
      id: "002",
      label: "002",
      capacity: 30,
      enrolled: 0,
      meetings: [{ weeks: [3,4,5,6,7,8,9,10], weekday: 4, periods: [9, 10], room: "2-202" }],
    }],
  },
  {
    id: "nobel-physics",
    code: "00031002N",
    name: "走近诺贝尔物理学奖",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [{
      id: "001",
      label: "001",
      capacity: 30,
      enrolled: 27,
      meetings: [{ weeks: range(1, 8), weekday: 5, periods: [9, 10], room: "11-105" }],
    }],
  },
  {
    id: "intro-robot",
    code: "00031004N",
    name: "初识智能机器人",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [{
      id: "001",
      label: "001",
      capacity: 30,
      enrolled: 15,
      meetings: [{ weeks: range(9, 16), weekday: 2, periods: [9, 10], room: "10-204" }],
    }],
  },
  {
    id: "gene-model-animal",
    code: "00031009N",
    name: "基因技术与模式动物行为学",
    credits: 2,
    hours: 32,
    module: "理工类",
    sections: [{
      id: "002",
      label: "002",
      capacity: 30,
      enrolled: 0,
      meetings: [{ weeks: range(3, 18), weekday: 1, periods: [9, 10], room: "2-126" }],
    }],
  },
  {
    id: "life-design",
    code: "00031021N",
    name: "生命的设计与复刻：细胞培养的科学与伦理",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [{
      id: "002",
      label: "002",
      teacher: "刘杰芯",
      capacity: 30,
      enrolled: 0,
      meetings: [{ weeks: range(9, 16), weekday: 4, periods: [9, 10], room: "2-203" }],
    }],
    note: "与“探索大脑奥秘”同为星期四第9-10节，9-16周直接冲突。",
  },
  {
    id: "lab-safety",
    code: "00031022N",
    name: "实验室安全教育",
    credits: 1,
    hours: 16,
    module: "理工类",
    sections: [{
      id: "001",
      label: "001",
      teacher: "梁皓瑞 / 孙娜",
      capacity: 60,
      enrolled: 13,
      meetings: [
        { weeks: [2,3,7,8], weekday: 6, periods: [1, 4], room: "10-107" },
      ],
    }],
  },
  {
    id: "yoga",
    code: "00041015N",
    name: "瑜伽与康复解密",
    credits: 1,
    hours: 16,
    module: "医学类",
    sections: [{
      id: "001",
      label: "001",
      teacher: "刘珊",
      capacity: 15,
      enrolled: 14,
      meetings: [{ weeks: range(9, 16), weekday: 1, periods: [9, 10] }],
    }],
  },
  {
    id: "chorus",
    code: "00051001N",
    name: "合唱艺术",
    credits: 1,
    hours: 16,
    module: "艺术类",
    sections: [{
      id: "001",
      label: "001",
      teacher: "刘秀荣",
      capacity: 30,
      enrolled: 19,
      meetings: [{ weeks: range(1, 8), weekday: 7, periods: [9, 10] }],
    }],
  },
  {
    id: "art-therapy",
    code: "00051003N",
    name: "艺术治疗",
    credits: 2,
    hours: 32,
    module: "艺术类",
    sections: [{
      id: "001",
      label: "001",
      teacher: "谭红倩",
      capacity: 30,
      enrolled: 14,
      meetings: [{ weeks: range(1, 16), weekday: 4, periods: [9, 10], room: "11-104" }],
    }],
  },
  {
    id: "latin-dance",
    code: "00051007N",
    name: "体育舞蹈（拉丁）鉴赏与表演",
    credits: 1,
    hours: 16,
    module: "艺术类",
    sections: [{
      id: "002",
      label: "002",
      teacher: "杨惠",
      capacity: 30,
      enrolled: 0,
      meetings: [{ weeks: range(9, 16), weekday: 1, periods: [9, 10] }],
    }],
  },
];

export const weekdayName = (n: number) =>
  ["", "一", "二", "三", "四", "五", "六", "日"][n] ?? "?";

export const remaining = (s: Section) => Math.max(0, s.capacity - s.enrolled);

export const conflict = (a: Meeting, b: Meeting) =>
  a.weekday === b.weekday &&
  a.weeks.some((w) => b.weeks.includes(w)) &&
  a.periods[0] <= b.periods[1] &&
  b.periods[0] <= a.periods[1];

export const sectionConflictsWithClinical1 = (s: Section) =>
  s.meetings.some((m) => clinicalClass1Busy.some((busy) => conflict(m, busy)));

export const sectionsConflict = (a: Section, b: Section) =>
  a.meetings.some((m1) => b.meetings.some((m2) => conflict(m1, m2)));
