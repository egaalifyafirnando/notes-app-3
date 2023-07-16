import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LocaleProvider } from '../contexts/LocaleContext';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';

class NoteApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authedUser: null,
            initializing: true,
            theme: localStorage.getItem('theme') || 'light',
            toggleTheme: () => {
                this.setState((prevState) => {
                    const newTheme =
                        prevState.theme === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme', newTheme);
                    return {
                        theme: newTheme,
                    };
                });
            },
            localeContext: {
                locale: localStorage.getItem('locale') || 'id',
                toggleLocale: () => {
                    this.setState((prevState) => {
                        const newLocale =
                            prevState.localeContext.locale === 'id'
                                ? 'en'
                                : 'id';
                        localStorage.setItem('locale', newLocale);
                        return {
                            localeContext: {
                                ...prevState.localeContext,
                                locale: newLocale,
                            },
                        };
                    });
                },
            },
        };

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async componentDidMount() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const { data } = await getUserLogged();
        this.setState(() => {
            return {
                authedUser: data,
                initializing: false,
            };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            document.documentElement.setAttribute(
                'data-theme',
                this.state.theme
            );
        }
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();

        this.setState(() => {
            return {
                authedUser: data,
            };
        });
    }

    onLogout() {
        this.setState(() => {
            return {
                authedUser: null,
            };
        });

        putAccessToken('');
    }

    render() {
        if (this.state.initializing) {
            return null;
        }

        if (this.state.authedUser === null) {
            return (
                <ThemeProvider value={this.state}>
                    <LocaleProvider value={this.state.localeContext}>
                        <div className='note-app'>
                            <header className='note-app__header'>
                                <h1>
                                    {this.state.localeContext.locale === 'id'
                                        ? 'Aplikasi Catatan'
                                        : 'Notes App'}
                                </h1>
                            </header>
                            <main>
                                <Routes>
                                    <Route
                                        path='/*'
                                        element={
                                            <LoginPage
                                                loginSuccess={
                                                    this.onLoginSuccess
                                                }
                                            />
                                        }
                                    />
                                    <Route
                                        path='/register'
                                        element={<RegisterPage />}
                                    />
                                </Routes>
                            </main>
                        </div>
                    </LocaleProvider>
                </ThemeProvider>
            );
        }

        return (
            <ThemeProvider value={this.state}>
                <LocaleProvider value={this.state.localeContext}>
                    <div className='note-app'>
                        <header className='note-app__header'>
                            <h1>
                                {this.state.localeContext.locale === 'id'
                                    ? 'Aplikasi Catatan'
                                    : 'Notes App'}
                            </h1>
                            <Navigation logout={this.onLogout} />
                            <p style={{ fontSize: '1.5rem' }} className='grey'>
                                Hi, {this.state.authedUser.name}
                            </p>
                        </header>
                        <main>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route
                                    path='/notes/new'
                                    element={<AddPage />}
                                />
                                <Route path='*' element={<NotFoundPage />} />
                                <Route
                                    path='/notes/:id'
                                    element={<DetailPage />}
                                />
                            </Routes>
                        </main>
                    </div>
                </LocaleProvider>
            </ThemeProvider>
        );
    }
}

export default NoteApp;
