
export interface TableState {
  isLoading: boolean;
  currentPage: number;
  filterBy: string;
  apiPagination: Record<string, string | null>;
  modalData: Record<string, string>;
  unfilteredLocalData: any;
  localData: any;
}
