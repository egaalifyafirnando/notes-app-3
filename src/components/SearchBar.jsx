import PropTypes from 'prop-types';
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

const SearchBar = ({ keyword, keywordChange }) => {
    const { locale } = useContext(LocaleContext);

    return (
        <input
            className='search-bar'
            type='text'
            placeholder={
                locale === 'id' ? 'Cari berdasarkan nama' : 'Search by name'
            }
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)}
        />
    );
};

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
