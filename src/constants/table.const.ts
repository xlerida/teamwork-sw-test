import { CHARACTER_KEYS } from './swapi.const';

export const COLUMNS_NAMES = {
  [CHARACTER_KEYS.name]: 'Name',
  [CHARACTER_KEYS.height]: 'Height (cm)',
  [CHARACTER_KEYS.mass]: 'Mass (kg)',
  [CHARACTER_KEYS.created]: 'Created',
  [CHARACTER_KEYS.edited]: 'Edited',
  [CHARACTER_KEYS.homeworld]: 'Planet Name',
};

export const BUTTON_ACTIONS = {
  increase: 1,
  decrease: -1,
};
