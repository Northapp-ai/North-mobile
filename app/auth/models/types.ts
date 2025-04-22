export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  fullName: string;
};

export type SignUpForm = User & {
  code: string;
};

export type Goal = {
  id: string;
  name: string;
  uri: string;
  dueDate: Date;
}
