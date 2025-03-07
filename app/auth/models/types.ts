
export type User = {
  email: string;
  name: string;
  lastName: string;
  password: string;
}

export type SignUpForm = User & {
  code: string;
};
