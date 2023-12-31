import { PAGINATION } from '../../constants/pagination';
import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';
import './ContactListPagination.scss';
const ContactListPagination = ({
    page,
    itemsPerPage,
    totalContacts,
    dispatchFilters
}) => (
    <div className='ContactListPagination'>
        <div className='ContactListPagination-itemsPerPage'>
            <Select
                value={itemsPerPage}
                onChange={e =>
                    dispatchFilters({
                        type: 'items_per_page_changed',
                        value: Number(e.target.value)
                    })
                }
                title='pagination'
                className='ContactListPagination-select'
            >
                {PAGINATION.ITEMS_PER_PAGE_VALUES.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </Select>
            <p>Per Page</p>
        </div>
        <PageSelector
            page={page}
            setPage={newPage =>
                dispatchFilters({ type: 'page_changed', value: newPage })
            }
            totalPages={Math.ceil(totalContacts / itemsPerPage)}
        />
    </div>
);

export default ContactListPagination;
