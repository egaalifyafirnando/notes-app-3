import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeConsumer } from '../contexts/ThemeContext';
import { LocaleConsumer } from '../contexts/LocaleContext';

function Navigation({ logout }) {
    return (
        <LocaleConsumer>
            {({ locale, toggleLocale }) => {
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
                                <ThemeConsumer>
                                    {({ theme, toggleTheme }) => {
                                        return (
                                            <button onClick={toggleTheme}>
                                                {theme === 'light' ? (
                                                    <FiMoon className='grey' />
                                                ) : (
                                                    <FiSun className='grey' />
                                                )}
                                            </button>
                                        );
                                    }}
                                </ThemeConsumer>
                            </li>
                            <li>
                                <button onClick={logout}>
                                    <FiLogOut className='grey' />
                                </button>
                            </li>
                        </ul>
                    </nav>
                );
            }}
        </LocaleConsumer>
    );
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default Navigation;
