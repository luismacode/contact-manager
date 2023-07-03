import IconButton from '../buttons/IconButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import './PageSelector.scss';
const PageSelector = ({ page, setPage, totalPages }) => {
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;
    return (
        <div className='PageSelector'>
            <IconButton
                color='purple'
                filled
                icon={ArrowLeftIcon}
                disabled={isFirstPage}
                onClick={() => setPage(page - 1)}
                title='move to left'
            />
            <span>
                Page {page} of {totalPages}
            </span>
            <IconButton
                color='purple'
                filled
                disabled={isLastPage}
                icon={ArrowRightIcon}
                onClick={() => setPage(page + 1)}
                title='move to right'
            />
        </div>
    );
};

export default PageSelector;
