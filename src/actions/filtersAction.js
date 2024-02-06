import { FILTERS_ACTION } from '../constants/filtersAction';

export const searchChanged = search => ({
    type: FILTERS_ACTION.SEARCH,
    payload: search
});
export const onlyAvailableChanged = onlyAvailable => ({
    type: FILTERS_ACTION.ONLY_AVAILABLE,
    payload: onlyAvailable
});
export const sortByChanged = sortBy => ({
    type: FILTERS_ACTION.SORT_BY,
    payload: sortBy
});
export const pageChanged = page => ({
    type: FILTERS_ACTION.PAGE,
    payload: page
});
export const itemsPerPageChanged = itemsPerPage => ({
    type: FILTERS_ACTION.ITEMS_PER_PAGE,
    payload: itemsPerPage
});
export const reset = () => ({
    type: FILTERS_ACTION.RESET
});
