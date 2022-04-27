/* eslint-disable */

import {
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
  createStore,
} from 'vuex';

import { Table } from './Table/index';

import { State } from './interfaces/state';

export const store = createStore<State>({
  modules: {
    Table,
  },
});

export function useStore() {
  return store as Store;
}

export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
  commit<
    K extends keyof any,
    P extends Parameters<any[K]>[1]>
  (
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<any[K]>;
} & {
  dispatch<K extends keyof any>(
    key: K,
    payload?: Parameters<any[K]>[1],
    options?: DispatchOptions
  ): ReturnType<any[K]>;
} & {
  getters: {
    [K in keyof any]: ReturnType<any[K]>
  };
};
