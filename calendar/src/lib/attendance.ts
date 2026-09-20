export type PersonRole = "aa" | "pa" | "student" | "guest";

export interface SeatPlacement {
  zone: "advisor" | "student";
  row: number;
  seat: number;
}

export interface AttendancePerson {
  id: string;
  name: string;
  englishName: string;
  role: PersonRole;
  present: boolean;
  placement: SeatPlacement | null;
}

export interface AttendanceSnapshot {
  date: string;
  course: string;
  section: string;
  recordedAt: string;
  label: string;
  studentRowCount: number;
  seatsPerRow: number;
  people: AttendancePerson[];
}

export interface DisplayPerson {
  id: string;
  name: string;
  englishName: string;
  role: PersonRole;
  displayName: string;
  trueName: string;
  displayCollege: string;
  displayCountry: string;
  displayHobbies: string;
  displayPhoto: string;
  present: boolean;
  placement: SeatPlacement | null;
}

export function toDisplayPerson(person: AttendancePerson): DisplayPerson {
  return {
    id: person.id,
    name: person.name,
    englishName: person.englishName,
    role: person.role,
    displayName: person.name,
    trueName: person.name,
    displayCollege: "",
    displayCountry: "",
    displayHobbies: "",
    displayPhoto: "",
    present: person.present,
    placement: person.placement,
  };
}
