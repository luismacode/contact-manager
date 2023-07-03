import { useState } from 'react';
import { SORTOPTIONS } from '../constants/sortOptions';
const INITIAL_STATE = {
    search: '',
    onlyAvailable: false,
    sortBy: SORTOPTIONS.DEFAULT,
    page: 1,
    itemsPerPage: 6
};
export const useFilters = () => {
    const [filters, setFilters] = useState(INITIAL_STATE);

    const setSearch = search => setFilters({ ...filters, page: 1, search });
    const setOnlyAvailable = onlyAvailable => {
        const newSortBy =
            onlyAvailable && filters.sortBy === SORTOPTIONS.AVAILABLE
                ? SORTOPTIONS.DEFAULT
                : filters.sortBy;

        setFilters({
            ...filters,
            page: 1,
            sortBy: newSortBy,
            onlyAvailable
        });
    };
    const setSortBy = sortBy => setFilters({ ...filters, page: 1, sortBy });

    const setPage = newPage => setFilters({ ...filters, page: newPage });

    const setItemsPerPage = newItemsPerPage =>
        setFilters({ ...filters, page: 1, itemsPerPage: newItemsPerPage });

    const resetFilters = () => setFilters(INITIAL_STATE);
    const { search, onlyAvailable, sortBy, page, itemsPerPage } = filters;
    return {
        filters: {
            search,
            onlyAvailable,
            sortBy
        },
        pagination: {
            page,
            itemsPerPage
        },
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
