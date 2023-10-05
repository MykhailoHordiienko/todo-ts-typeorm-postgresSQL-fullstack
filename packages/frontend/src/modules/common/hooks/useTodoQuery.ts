import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import HttpTodoService from '../../../services/httpTodo.service';
import { AddTodoType, TodoType } from '../types/student.types';
import { QUERY_KEYS } from '../consts/app-keys.const';

const todoService = new HttpTodoService();

export const useTodosQuery = () => {
  const [searchParams] = useSearchParams();
  const { filter, search } = Object.fromEntries([...searchParams]);

  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryFn: () => todoService.getTodos(filter, search),
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
  useEffect(() => {
    refetch();
  }, [filter, search]);
  return { data, isSuccess, isLoading, isError, refetch };
};

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

export const useTodosUpdateStatusMutation = (updatedTodo: TodoType) => {
  const client = useQueryClient();

  const { mutate: upDateTodoStatus, isLoading: updatingStatus } = useMutation({
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
  return { upDateTodoStatus, updatingStatus };
};

export const useTodosUpdatePrivateMutation = (updatedTodo: TodoType) => {
  const client = useQueryClient();

  const { mutate: upDateTodoPrivate, isLoading: updatingPrivate } = useMutation({
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
  return { upDateTodoPrivate, updatingPrivate };
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
