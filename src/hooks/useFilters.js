import { useState } from 'react';
import { SORTOPTIONS } from '../constants/sortOptions';
import { PAGINATION } from '../constants/pagination';
const INITIAL_STATE = {
    search: '',
    onlyAvailable: false,
    sortBy: SORTOPTIONS.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemsPerPage: PAGINATION.DEFAULT_ITEMS_PER_PAGE
};
export const useFilters = () => {
    const [filters, setFilters] = useState(INITIAL_STATE);

    const setSearch = search =>
        setFilters({ ...filters, page: PAGINATION.DEFAULT_PAGE, search });
    const setOnlyAvailable = onlyAvailable => {
        const newSortBy =
            onlyAvailable && filters.sortBy === SORTOPTIONS.AVAILABLE
                ? SORTOPTIONS.DEFAULT
                : filters.sortBy;

        setFilters({
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            sortBy: newSortBy,
            onlyAvailable
        });
    };
    const setSortBy = sortBy =>
        setFilters({ ...filters, page: PAGINATION.DEFAULT_PAGE, sortBy });

    const setPage = newPage => setFilters({ ...filters, page: newPage });

    const setItemsPerPage = newItemsPerPage =>
        setFilters({
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            itemsPerPage: newItemsPerPage
        });

    const resetFilters = () => setFilters({ ...INITIAL_STATE });
    return {
        filters,
        filterSetters: {
            setSearch,
            setOnlyAvailable,
            setSortBy
        },
        paginationSetters: {
            setPage,
            setItemsPerPage
        },
        resetFilters
    };
};
