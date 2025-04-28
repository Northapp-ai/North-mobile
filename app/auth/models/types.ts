export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  fullName: string;
  profilePhoto?: string;
  bio?: string;
};

export type SignUpForm = User & {
  code: string;
};

export type Goal = {
  id: string;
  name: string;
  uri: string;
  dueDate: Date;
};
