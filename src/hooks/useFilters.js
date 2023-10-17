import { useReducer } from 'react';
import { SORTOPTIONS } from '../constants/sortOptions';
import { PAGINATION } from '../constants/pagination';

const INITIAL_STATE = {
    search: '',
    onlyAvailable: false,
    sortBy: SORTOPTIONS.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};

const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'search_changed':
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                search: action.value
            };
        case 'only_available_changed': {
            const newSortBy =
                action.value && state.sortBy === SORTOPTIONS.AVAILABLE
                    ? SORTOPTIONS.DEFAULT
                    : state.sortBy;

            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: newSortBy,
                onlyAvailable: action.value
            };
        }
        case 'sort_by_changed':
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: action.value
            };
        case 'page_changed':
            return { ...state, page: action.value };
        case 'items_per_page_changed':
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                itemsPerPage: action.value
            };
        case 'reset':
            return { ...INITIAL_STATE };
        default:
            throw new Error('invalid action type');
    }
};
export const useFilters = () => {
    const [filters, dispatchFilters] = useReducer(
        filtersReducer,
        INITIAL_STATE
    );
    return {
        filters,
        dispatchFilters
    };
};
