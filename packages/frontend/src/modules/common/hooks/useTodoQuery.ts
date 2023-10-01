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

export const useTodosDeleteMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
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
};

export const useTodosUpdateMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (updatedTodo: TodoType) => todoService.updateTodo(updatedTodo),
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
};

export const useTodosAddMutation = () => {
  const client = useQueryClient();

  return useMutation({
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
};
