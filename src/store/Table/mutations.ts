import { MutationTree } from 'vuex';
import { TableState } from './interfaces';

export enum TableMutations {
  SetIsLoading = 'Table:SET_IS_LOADING',
  SetCurrentPage = 'Table:SET_CURRENT_PAGE',
  SetApiPagination = 'Table:SET_API_PAGINATION',
  SetUnfilteredLocalData = 'Table:SET_UNFILTERED_LOCAL_DATA',
  SetLocalData = 'Table:SET_LOCAL_DATA',
  SetModalData = 'Table:SET_MODAL_DATA',
  SetFilterBy = 'Table:SET_FILTER_BY',
}

export interface TableData {
  [TableMutations.SetIsLoading](state: TableState, isLoading: boolean): void;
  [TableMutations.SetCurrentPage](state: TableState, increaseDecrease: number): void;
  [TableMutations.SetApiPagination](state: TableState, previousNext: Record<string, string | null>): void;
  [TableMutations.SetUnfilteredLocalData](state: TableState, data: Record<string, string | string[]>): void;
  [TableMutations.SetLocalData](state: TableState, data: Record<string, string | string[]>): void;
  [TableMutations.SetModalData](state: TableState, data: Record<string, string | string>): void;
  [TableMutations.SetFilterBy](state: TableState, filterBy: string): void;
}

export const mutations: MutationTree<TableState> & TableData = {
  [TableMutations.SetIsLoading](state, isLoading = true) {
    state.isLoading = isLoading;
  },
  [TableMutations.SetCurrentPage](state, increaseDecrease) {
    state.currentPage += increaseDecrease;
  },
  [TableMutations.SetApiPagination](state: TableState, { previous, next }) {
    state.apiPagination = {
      previous,
      next,
    };
  },
  [TableMutations.SetUnfilteredLocalData](state, data) {
    state.unfilteredLocalData = data;
  },
  [TableMutations.SetLocalData](state, data) {
    state.localData = data;
  },
  [TableMutations.SetModalData](state, data) {
    state.modalData = data;
  },
  [TableMutations.SetFilterBy](state, filterBy) {
    state.filterBy = filterBy;
  },
};
