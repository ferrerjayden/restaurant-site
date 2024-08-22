export type HandleSubmit = (
  event: React.MouseEvent<HTMLFormElement, MouseEvent>,
) => void;

export type FormFields = {
  name: string;
  type: string;
};

export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type LoginUser = {
  username: string;
  password: string;
};
