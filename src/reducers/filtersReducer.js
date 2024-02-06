import { FILTERS_ACTION } from '../constants/filtersAction';
import { PAGINATION } from '../constants/pagination';
import { SORTOPTIONS } from '../constants/sortOptions';

export const FILTERS_INITIAL_STATE = {
    search: '',
    onlyAvailable: false,
    sortBy: SORTOPTIONS.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

export const filtersReducer = (state, { type, payload }) => {
    switch (type) {
        case FILTERS_ACTION.SEARCH:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                search: payload
            };
        case FILTERS_ACTION.ONLY_AVAILABLE: {
            const newSortBy =
                payload && state.sortBy === SORTOPTIONS.AVAILABLE
                    ? SORTOPTIONS.DEFAULT
                    : state.sortBy;

            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: newSortBy,
                onlyAvailable: payload
            };
        }
        case FILTERS_ACTION.SORT_BY:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: payload
            };
        case FILTERS_ACTION.PAGE:
            return { ...state, page: payload };
        case FILTERS_ACTION.ITEMS_PER_PAGE:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                itemsPerPage: payload
            };
        case FILTERS_ACTION.RESET:
            return { ...FILTERS_INITIAL_STATE };
        default:
            throw new Error('invalid action type');
    }
};
