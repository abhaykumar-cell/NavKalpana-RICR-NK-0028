import { students } from "../data/dummyStudents";

export const getStudents = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(students), 500));
};