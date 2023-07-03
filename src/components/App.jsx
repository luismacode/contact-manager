import ContactHeaderLayout from './layouts/ContactHeaderLayout';
import ContactList from './contact-list/ContactList';
import './App.scss';

const App = () => (
    <div className='App'>
        <ContactHeaderLayout />
        <ContactList />
    </div>
);

export default App;
