import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

const Navigation = ({ logout }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);

    return (
        <nav className='navigation'>
            <ul>
                <li>
                    <button onClick={toggleLocale} className='grey'>
                        {locale === 'id' ? 'en' : 'id'}
                    </button>
                </li>
                <li>
                    <Link to='/'>
                        <FiHome className='grey' />
                    </Link>
                </li>
                <li>
                    <Link to='/notes/new'>
                        <FiPlusCircle className='grey' />
                    </Link>
                </li>
                <li>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? (
                            <FiMoon className='grey' />
                        ) : (
                            <FiSun className='grey' />
                        )}
                    </button>
                </li>
                <li>
                    <button onClick={logout}>
                        <FiLogOut className='grey' />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default Navigation;
