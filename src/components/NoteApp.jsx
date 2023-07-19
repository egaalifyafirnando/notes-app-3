import { useEffect, useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserLogged, putAccessToken } from '../utils/api';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LocaleProvider } from '../contexts/LocaleContext';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

const NoteApp = () => {
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleLocale = () => {
        const newLocale = locale === 'id' ? 'en' : 'id';
        localStorage.setItem('locale', newLocale);
        setLocale(newLocale);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchUserLogged = async () => {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        };

        fetchUserLogged();
    }, []);

    const onLoginSuccess = async ({ accessToken }) => {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    };

    const onLogout = () => {
        setAuthedUser(null);
        putAccessToken('');
    };

    const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
    const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

    if (initializing) {
        return null;
    }

    return (
        <ThemeProvider value={themeContextValue}>
            <LocaleProvider value={localeContextValue}>
                <div className='note-app'>
                    <header className='note-app__header'>
                        <h1>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
                        {authedUser !== null && (
                            <>
                                <Navigation logout={onLogout} />
                                <p style={{ fontSize: '1.5rem' }} className='grey'>
                                    Hi, {authedUser.name}
                                </p>
                            </>
                        )}
                    </header>
                    <main>
                        <Routes>
                            {authedUser === null ? (
                                <>
                                    <Route path='/*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                                    <Route path='/register' element={<RegisterPage />} />
                                </>
                            ) : (
                                <>
                                    <Route path='/' element={<HomePage />} />
                                    <Route path='/notes/new' element={<AddPage />} />
                                    <Route path='*' element={<NotFoundPage />} />
                                    <Route path='/notes/:id' element={<DetailPage />} />
                                </>
                            )}
                        </Routes>
                    </main>
                </div>
            </LocaleProvider>
        </ThemeProvider>
    );
};

export default NoteApp;
