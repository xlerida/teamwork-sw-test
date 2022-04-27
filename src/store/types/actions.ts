import { ActionContext } from 'vuex';
import { State } from '../interfaces/state';

export type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof any>(
    key: K,
    payload?: Parameters<any[K]>[1]
  ): ReturnType<any[K]>;
};
