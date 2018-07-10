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
}

export interface State {
  sources: { [key: string]: Source };
}
