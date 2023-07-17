import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

const NoteInput = ({ addNote }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { locale } = useContext(LocaleContext);

    const onTitleChangeEventHandler = (event) => {
        setTitle(event.target.value);
    };

    const onBodyChangeEventHandler = (event) => {
        setBody(event.target.innerHTML);
    };

    const onSubmitEventHandler = (event) => {
        event.preventDefault();
        addNote({ title, body });
    };

    return (
        <form className='note-input' onSubmit={onSubmitEventHandler}>
            <input
                className='note-input-item'
                type='text'
                placeholder={locale === 'id' ? 'Judul' : 'Title'}
                value={title}
                onChange={onTitleChangeEventHandler}
            />
            <div
                className='note-input-item'
                placeholder='Write a note ...'
                contentEditable
                onInput={onBodyChangeEventHandler}
            />
            <button type='submit' className='note-input-item'>
                {locale === 'id' ? 'Tambah Catatan' : 'Add Note'}
            </button>
        </form>
    );
};

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default NoteInput;
