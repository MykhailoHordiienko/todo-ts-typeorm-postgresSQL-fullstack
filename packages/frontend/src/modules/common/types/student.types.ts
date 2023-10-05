export type TodoType = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};
export type AddTodoType = {
  title: string;
  description: string;
};

export type AuthType = {
  email: string;
  password: string;
};

export type AuthResponseType = {
  token: string;
} & AuthType;

export type AddTodoComponentType = {
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
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
};

export type LinkType = {
  title: string;
  to: string;
};

export type RestrictedRouteType = {
  component: JSX.Element;
  redirectTo: string;
};
