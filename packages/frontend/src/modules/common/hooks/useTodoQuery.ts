import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import HttpTodoService from '../../../services/httpTodo.service';
import { AddTodoType, TodoType } from '../types/student.types';
import { QUERY_KEYS } from '../consts/app-keys.const';

const todoService = new HttpTodoService();

export const useTodosQuery = () =>
  useQuery({
    queryFn: () => todoService.getTodos(),
    queryKey: [QUERY_KEYS.STATE, QUERY_KEYS.ALL],
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        if (err?.response?.data.message !== 'Unauthorized') {
          toast.error(err?.response?.data.message);
        }
      } else {
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

export const useCancelQueryTodo = () => {
  const { cancelQueries } = useQueryClient();
  const cancelRequest = () => cancelQueries({ queryKey: [QUERY_KEYS.STATE, QUERY_KEYS.ALL] });
  return cancelRequest;
};
