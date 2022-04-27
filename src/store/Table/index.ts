import { Module } from 'vuex';

import { getters } from './getters';
import { mutations } from './mutations';
import { TableState } from './interfaces';
import { State } from '../interfaces/state';

export const Table: Module<TableState, State> = {
  mutations,
  getters,
  state: {
    isLoading: false,
    currentPage: 1,
    apiPagination: {},
    unfilteredLocalData: {},
    localData: {},
    modalData: {},
    filterBy: '',
  },
};
