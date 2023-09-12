import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import './ContactListViewSelector.scss';
const ContactListViewSelector = ({ view, setView }) => (
    <div className='ViewSelector'>
        <button
            type='button'
            title='grid'
            className='ViewSelector-button'
            onClick={() => setView(false)}
            disabled={!view}
        >
            <GridIcon className='ViewSelector-icon' />
        </button>
        <div className='ViewSelector-divider'></div>
        <button
            type='button'
            title='list'
            className='ViewSelector-button'
            onClick={() => setView(true)}
            disabled={view}
        >
            <ListIcon className='ViewSelector-icon' />
        </button>
    </div>
);

export default ContactListViewSelector;
