import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterPage() {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }

    return (
        <LocaleConsumer>
            {({ locale }) => {
                return (
                    <section className='register-page'>
                        <h2>
                            {locale === 'id'
                                ? 'Gak perlu serius-serius ya isinya ...'
                                : 'You dont have to take it seriously...'}
                        </h2>
                        <RegisterInput register={onRegisterHandler} />
                        <p>
                            {locale === 'id' ? 'Kembali ke ' : 'Back to '}
                            <Link to='/'>
                                {locale === 'id' ? 'Masuk' : 'Login'}
                            </Link>
                        </p>
                    </section>
                );
            }}
        </LocaleConsumer>
    );
}

export default RegisterPage;
