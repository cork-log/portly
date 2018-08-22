export interface Entry {
  id: string;
  source_id: string;
  level: string;
  tag: string;
  content: string;
  timestamp_occurred: string;
  timestamp_stored: string;
}
export interface AuthContext {
  id: string;
  name: string;
  enabled: boolean;
  source_id: string;
}
export interface Source {
  id: string;
  name: string;
  entries: Entry[];
  contexts: AuthContext[];
  jobs: Job[];
}
export interface Job {
  id: string;
  source_id: string;
  name: string;
  tolerance: number;
  frequency: Frequency;
  expected_at: string;
}
export type Frequency = 'H' | 'D' | 'W' | 'M';

export interface State {
  sources: { [key: string]: Source };
}
