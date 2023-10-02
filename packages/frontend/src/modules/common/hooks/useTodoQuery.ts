import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import HttpTodoService from '../../../services/httpTodo.service';
import { AddTodoType, TodoType } from '../types/student.types';

const todoService = new HttpTodoService();

export const useTodosQuery = (state: string, stateId: string) =>
  useQuery({
    queryFn: () => todoService.getTodos(),
    queryKey: [state, stateId],
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });

export const useTodosDeleteMutation = (id: string) => {
  const client = useQueryClient();

  const { mutate: deleteTodo, isLoading: deleting } = useMutation({
    mutationFn: () => todoService.deleteTodo(id),
    onSuccess: () => {
      client.invalidateQueries();
      toast.success('Successfully Update!');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { deleteTodo, deleting };
};

export const useTodosUpdateMutation = (updatedTodo: TodoType) => {
  const client = useQueryClient();

  const { mutate: upDateTodo, isLoading: updating } = useMutation({
    mutationFn: () => todoService.updateTodo(updatedTodo),
    onSuccess: () => {
      client.invalidateQueries();
      toast.success('Successfully Update!');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { upDateTodo, updating };
};

export const useTodosAddMutation = () => {
  const client = useQueryClient();

  const { mutate: addTodo } = useMutation({
    mutationFn: (updatedTodo: AddTodoType) => todoService.addTodo(updatedTodo),
    onSuccess: () => {
      client.invalidateQueries();
      toast.success('Successfully Update!');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(`${err.message} Reload Please`);
      }
    }
  });
  return { addTodo };
};
