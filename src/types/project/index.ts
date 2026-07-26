export type ProjectStack = {
  frontend?: string[];
  backend?: string[];
  [key: string]: string[] | undefined;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  image?: string[];
  description?: string;
  role?: string;
  client?: string;
  stack?: ProjectStack;
  liveLink?: string;
  challenge?: string;
  solution?: string;
  impact?: string[];
};

export type ProjectRecord = Record<string, Omit<Project, "id">>;
