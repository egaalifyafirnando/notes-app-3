import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

const LoginPage = ({ loginSuccess }) => {
    const { locale } = useContext(LocaleContext);

    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <section>
            <h2>{locale === 'id' ? 'Silahkan masuk untuk melanjutkan ...' : 'Please login to continue...'}</h2>
            <LoginInput login={onLogin} />
            <p>
                {locale === 'id' ? 'Belum punya akun?' : 'No account yet?'}
                <Link to='/register'>{locale === 'id' ? 'Daftar disini.' : 'register here.'}</Link>
            </p>
        </section>
    );
};

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
