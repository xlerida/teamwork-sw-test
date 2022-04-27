import { GetterTree } from 'vuex';
import { TableState } from './interfaces';
import { State } from '../interfaces/state';

export enum TableGetters {
  GetIsLoading = 'Table:GET_IS_LOADING',
  GetCurrentPage = 'Table:GET_CURRENT_PAGE',
  GetApiPagination = 'Table:GET_API_PAGINATION',
  GetUnfilteredLocalData = 'Table:GET_UNFILTERED_LOCAL_DATA',
  GetLocalData = 'Table:GET_LOCAL_DATA',
  GetModalData = 'Table:GET_MODAL_DATA',
  GetFilterBy = 'Table:GET_FILTER_BY',
}

export interface TableGetterData {
  [TableGetters.GetIsLoading](state: TableState): void;
  [TableGetters.GetCurrentPage](state: TableState): void;
  [TableGetters.GetApiPagination](state: TableState): void;
  [TableGetters.GetUnfilteredLocalData](state: TableState): void;
  [TableGetters.GetLocalData](state: TableState): void;
  [TableGetters.GetModalData](state: TableState): void;
  [TableGetters.GetFilterBy](state: TableState): void;
}

export const getters: GetterTree<TableState, State> & TableGetterData = {
  [TableGetters.GetIsLoading](state) {
    return state.isLoading;
  },
  [TableGetters.GetCurrentPage](state) {
    return state.currentPage;
  },
  [TableGetters.GetApiPagination](state) {
    return state.apiPagination;
  },
  [TableGetters.GetUnfilteredLocalData](state) {
    return state.unfilteredLocalData;
  },
  [TableGetters.GetLocalData](state) {
    return state.localData;
  },
  [TableGetters.GetModalData](state) {
    return state.modalData;
  },
  [TableGetters.GetFilterBy](state) {
    return state.filterBy;
  },
};
