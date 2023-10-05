export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  personal: boolean;
};
export type AddTodoType = {
  title: string;
  description: string;
};

export type AuthType = {
  email: string;
  password: string;
};

export type UpdateAuthType = {
  email: string;
  password: string;
  newPassword: string;
};

export type AuthResponseType = {
  token: string;
} & AuthType;

export type AddModalType = {
  toggleModal?: () => void;
};

export type TodoViewType = TodoType & { handleModal: () => void };

export type TodoListType = {
  todos: TodoType[];
};

export type ModalType = {
  isActive: boolean;
  closeButton?: boolean;
  children: React.ReactNode;
  toggleModal: () => void;
};

export interface IComponents {
  [key: string]: React.ComponentType<TodoListType>;
}

export type ButtonType = {
  title: string;
  action?: () => void;
  callBack?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  isActive?: boolean;
};

export type SearchType = {
  callBack: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type LinkType = {
  title: string;
  to: string;
};

export type RestrictedRouteType = {
  component: JSX.Element;
  redirectTo: string;
};
