import { useState, useContext } from 'react';
import { addNote } from '../utils/api';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

const AddPage = () => {
    const navigate = useNavigate();
    const { locale } = useContext(LocaleContext);
    const [isAddingNote, setIsAddingNote] = useState(false);

    async function onAddNoteHandler(note) {
        setIsAddingNote(true);
        await addNote(note);
        setIsAddingNote(false);
        navigate('/');
    }

    return (
        <section>
            <h2>{locale === 'id' ? 'Tambah Catatan' : 'Add Note'}</h2>
            <NoteInput addNote={onAddNoteHandler} disabled={isAddingNote} />
        </section>
    );
};

export default AddPage;
