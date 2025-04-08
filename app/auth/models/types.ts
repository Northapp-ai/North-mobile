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
