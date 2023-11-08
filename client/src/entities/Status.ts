export type StatusType = "IC" | "GB" | "CLOSED";

export interface Status {
  status: StatusType;
  icLink: string;
}
