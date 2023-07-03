import PageSelector from '../forms/PageSelector';
import Select from '../forms/Select';
import './ContactListPagination.scss';
const ContactListPagination = ({
    page,
    itemsPerPage,
    setPage,
    setItemsPerPage,
    totalPages
}) => (
    <div className='ContactListPagination'>
        <div className='ContactListPagination-itemsPerPage'>
            <Select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                title='pagination'
                className='ContactListPagination-select'
            >
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
            </Select>
            <p>Items Per Page</p>
        </div>
        <PageSelector page={page} setPage={setPage} totalPages={totalPages} />
    </div>
);

export default ContactListPagination;
