export type CovidRow = {
  date: string;
  type: string;
  residence: string;
  positive: number;
  negative: number;
  total: number;
};

export const POPULATION = {
  facultyStaff: 16_000,
  nonResidentialStudents: 13_000,
  residentialStudents: 4_000,
} as const;

export const RESIDENCE = {
  facultyStaff: "Non-Residential",
  nonResidentialStudents: "Students - Non-Residential",
  residentialStudents: "Students - Residential",
} as const;

/** Precomputed from UM_C19_2021.csv (16 Aug 2020 – 15 Aug 2021). */
export const COVID_SUMMARY = {
  facultyStaff: {
    label: "Faculty/Staff",
    n: 358,
    positiveSum: 788,
    positiveMean: 2.201,
    positiveMax: 17,
    population: POPULATION.facultyStaff,
  },
  nonResidentialStudents: {
    label: "Students (off-campus)",
    n: 361,
    positiveSum: 1530,
    positiveMean: 4.238,
    positiveMax: 52,
    population: POPULATION.nonResidentialStudents,
  },
  residentialStudents: {
    label: "Students (residential)",
    n: 344,
    positiveSum: 1177,
    positiveMean: 3.422,
    positiveMax: 84,
    population: POPULATION.residentialStudents,
  },
} as const;

export const FACULTY_YEARLY_POSITIVES = COVID_SUMMARY.facultyStaff.positiveSum;
export const FACULTY_INFECTION_RATE = FACULTY_YEARLY_POSITIVES / POPULATION.facultyStaff;

export async function loadCovidRows(): Promise<CovidRow[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}data/UM_C19_2021.csv`);
  if (!response.ok) {
    throw new Error(`Failed to load COVID data (${response.status})`);
  }
  const text = await response.text();
  const lines = text.trim().split(/\r?\n/).slice(1);
  return lines.map((line) => {
    const [date, type, residence, positive, negative] = line.split(",");
    const pos = Number(positive);
    const neg = Number(negative);
    return {
      date,
      type,
      residence,
      positive: pos,
      negative: neg,
      total: pos + neg,
    };
  });
}

export function filterByResidence(rows: CovidRow[], residence: string): CovidRow[] {
  return rows.filter((row) => row.residence === residence);
}
