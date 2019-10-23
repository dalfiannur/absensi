export type User = {
  id?: number;
  nik: string;
  name: string;
  improvement?: string;
  role?: {
    id: number;
    name: string;
  };
  createdAt?: string;
};
