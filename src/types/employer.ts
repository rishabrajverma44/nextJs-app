export interface JobSeeker {
  formID: string;
  company: string;
  role: string;
  jobType: string;
  location: string;
  status: string;
  date: string;
  notes: string;
  applied: boolean;
}

export interface chartData {
  company: string;
  date: string;
  formID: string;
  jobType: string;
  location: string;
  notes: string;
  role: string;
  status: string;
}

export interface formInterface {
  formID?: string | null | undefined;
  company: string;
  role: string;
  jobType: string;
  location: string;
  status: string;
  date: string;
  notes: string;
}
