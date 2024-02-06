import InputCheckbox from '../forms/InputCheckbox';
import InputSearch from '../forms/InputSearch';
import Select from '../forms/Select';
import './ContactListFilters.scss';
import { SORTOPTIONS } from '../../constants/sortOptions';
import IconButton from '../buttons/IconButton';
import { useContext } from 'react';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';
import AddContactIcon from '../icons/addContactIcon';
import {
    onlyAvailableChanged,
    searchChanged,
    sortByChanged
} from '../../actions/filtersAction';
const ContactListFilters = ({
    search,
    onlyAvailable,
    sortBy,
    dispatchFilters
}) => {
    const { setCreateForm } = useContext(ContactFormsContext);
    return (
        <form className='Filters'>
            <InputSearch
                placeholder='Search...'
                value={search}
                onChange={e => dispatchFilters(searchChanged(e.target.value))}
                title='Search by name'
            />
            <Select
                className='Filters-select'
                value={sortBy}
                onChange={e =>
                    dispatchFilters(sortByChanged(Number(e.target.value)))
                }
                title='sort by '
            >
                <option value={SORTOPTIONS.DEFAULT}>by default</option>
                <option value={SORTOPTIONS.NAME}>by name</option>
                <option value={SORTOPTIONS.ROLE}>by role</option>
                {!onlyAvailable && (
                    <option value={SORTOPTIONS.AVAILABLE}>by status</option>
                )}
            </Select>
            <div className='Filters-row'>
                <div className='Filters-status'>
                    <InputCheckbox
                        className='Filters-checkbox'
                        checked={onlyAvailable}
                        onChange={e =>
                            dispatchFilters(
                                onlyAvailableChanged(e.target.checked)
                            )
                        }
                        title='filter only Availables'
                    />
                    <p>Availables</p>
                </div>
                <div className='Filters-icon'>
                    <IconButton
                        onClick={setCreateForm}
                        title='add contact'
                        icon={AddContactIcon}
                    />
                </div>
            </div>
        </form>
    );
};

export default ContactListFilters;
