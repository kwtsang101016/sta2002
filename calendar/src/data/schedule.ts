/** Course schedule for STA2002 Fall 2026–27 (from Schedule_KaWai / course-admin). */

export type EventKind = "lecture" | "midterm" | "assignment" | "review" | "break";

export interface CourseEvent {
  /** ISO date YYYY-MM-DD */
  date: string;
  title: string;
  kind: EventKind;
  /** Highlight in red (exams, assignment due dates, etc.) */
  special?: boolean;
  /** Optional attendance snapshot under public/attendance/{date}.json */
  attendanceFile?: string;
}

export const COURSE_EVENTS: CourseEvent[] = [
  { date: "2026-09-08", title: "Introduction", kind: "lecture" },
  {
    date: "2026-09-10",
    title: "Review of common distributions, MGF, CLT",
    kind: "lecture",
  },
  { date: "2026-09-15", title: "Maximum Likelihood Estimation", kind: "lecture" },
  {
    date: "2026-09-17",
    title: "Method of moments, Unbiased estimation",
    kind: "lecture",
    attendanceFile: "2026-09-17.json",
  },
  { date: "2026-09-22", title: "Confidence intervals for means", kind: "lecture" },
  {
    date: "2026-09-24",
    title: "CIs for difference of two means, CIs for proportions",
    kind: "lecture",
  },
  { date: "2026-09-29", title: "Tests of statistical hypotheses", kind: "lecture" },
  {
    date: "2026-09-30",
    title: "HW1 due 23:59",
    kind: "assignment",
    special: true,
  },
  { date: "2026-10-08", title: "Critical region, p-values", kind: "lecture" },
  { date: "2026-10-13", title: "Student's t-tests", kind: "lecture" },
  { date: "2026-10-15", title: "Tests about proportions", kind: "lecture" },
  { date: "2026-10-20", title: "Review session", kind: "review" },
  {
    date: "2026-10-24",
    title: "Midterm 14:00–16:30",
    kind: "midterm",
    special: true,
  },
  { date: "2026-10-27", title: "Power of a statistical test", kind: "lecture" },
  { date: "2026-10-29", title: "Power of a statistical test", kind: "lecture" },
  { date: "2026-11-03", title: "Order statistics", kind: "lecture" },
  { date: "2026-11-05", title: "Nonparametric CIs and tests", kind: "lecture" },
  { date: "2026-11-10", title: "Chi-square goodness-of-fit tests", kind: "lecture" },
  {
    date: "2026-11-12",
    title: "Tests for homogeneity and independence",
    kind: "lecture",
  },
  { date: "2026-11-17", title: "One-way ANOVA", kind: "lecture" },
  { date: "2026-11-19", title: "F-tests", kind: "lecture" },
  { date: "2026-11-24", title: "Two-way ANOVA", kind: "lecture" },
  { date: "2026-11-26", title: "Introduction to regression", kind: "lecture" },
  { date: "2026-12-01", title: "More regression", kind: "lecture" },
  { date: "2026-12-03", title: "Tests concerning regression", kind: "lecture" },
  { date: "2026-12-08", title: "Likelihood ratio tests", kind: "lecture" },
  { date: "2026-12-10", title: "Review session", kind: "review" },
  { date: "2026-12-15", title: "Study break", kind: "break" },
  { date: "2026-12-17", title: "Study break", kind: "break" },
];

export function eventsByDate(events: CourseEvent[]): Map<string, CourseEvent[]> {
  const map = new Map<string, CourseEvent[]>();
  for (const event of events) {
    const list = map.get(event.date) ?? [];
    list.push(event);
    map.set(event.date, list);
  }
  return map;
}

export function isSpecialEvent(event: CourseEvent): boolean {
  return Boolean(event.special) || event.kind === "midterm" || event.kind === "assignment";
}
