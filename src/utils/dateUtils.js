const pad = (num, size) => {
  let res = num.toString();
  while (res.length < size) {
    res = "0" + res;
  }
  return res;
};

// YYYY-MM-DD
const dateYYYYMMDD = (date) =>
  `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(
    date.getDate(),
    2
  )}`;

export const gateDateString = (date) =>
  date instanceof Date ? dateYYYYMMDD(date) : "-";

// HH:MM
const dateHHMM = (date) =>
  `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`;

export const gateTimeString = (date) =>
  date instanceof Date ? dateHHMM(date) : "";

export const gateDateTimeString = (date) =>
  date instanceof Date ? `${gateDateString(date)} ${gateTimeString(date)}` : "";

const equalsDates = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const equalsDatesAndHours = (a, b) =>
  equalsDates(a, b) && a.getHours() === b.getHours();

export const encodeDateTime = (date) =>
  `${gateDateString(date)}T${gateTimeString(date)}`;

export const strToDate = (str) => (str ? new Date(str) : null);
