import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import './ContactListViewSelector.scss';
const ContactListViewSelector = ({ showRowsFormat, setShowRowsFormat }) => (
    <div className='ViewSelector'>
        <button
            type='button'
            title='grid'
            className='ViewSelector-button'
            onClick={() => setShowRowsFormat(false)}
            disabled={!showRowsFormat}
        >
            <GridIcon className='ViewSelector-icon' />
        </button>
        <div className='ViewSelector-divider'></div>
        <button
            type='button'
            title='list'
            className='ViewSelector-button'
            onClick={() => setShowRowsFormat(true)}
            disabled={showRowsFormat}
        >
            <ListIcon className='ViewSelector-icon' />
        </button>
    </div>
);

export default ContactListViewSelector;
