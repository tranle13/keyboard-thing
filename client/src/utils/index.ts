import * as dateFns from "date-fns";

export function formatDate(dateStr?: string, format: string = "MMM dd, yyyy") {
  if (!dateStr) return;
  return dateFns.format(new Date(dateStr), format);
}
