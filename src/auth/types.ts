export type Organization = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  organizations: Organization[];
};
