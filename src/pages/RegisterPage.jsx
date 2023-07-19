import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';
import LocaleContext from '../contexts/LocaleContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);
    const [isRegistering, setIsRegistering] = useState(false);

    async function onRegisterHandler(user) {
        setIsRegistering(true);
        const { error } = await register(user);
        setIsRegistering(false);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <section className='register-page'>
            <h2>
                {locale === 'id' ? 'Gak perlu serius-serius ya isinya ...' : 'You dont have to take it seriously...'}
            </h2>
            <RegisterInput register={onRegisterHandler} disabled={isRegistering} />
            <p>
                {locale === 'id' ? 'Kembali ke ' : 'Back to '}
                <Link to='/'>{locale === 'id' ? 'Masuk' : 'Login'}</Link>
            </p>
        </section>
    );
};

export default RegisterPage;
