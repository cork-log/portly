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
}
export interface JobDescriptor {
  id: string;
  source_id: string;
  name: string;
  tolerance: number;
  frequency: number;
  expected_at: string;
}

export interface Map<T> { [id: string]: T; }
export interface State {
  jobs: Map<Map<JobDescriptor>>;
  sources: Map<Source>;
  entries: Map<Map<Entry>>;
  contexts: Map<Map<AuthContext>>;
}
