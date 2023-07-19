import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

const NoteListArchive = ({ notes, onDelete, onUnarchive }) => {
    const { locale } = useContext(LocaleContext);
    const archiveNotes = notes.filter((note) => note.archived);

    return (
        <div className='note-list'>
            {archiveNotes.length ? (
                archiveNotes.map((note) => (
                    <NoteItem key={note.id} id={note.id} onDelete={onDelete} onUnarchive={onUnarchive} {...note} />
                ))
            ) : (
                <div className='note-items'>{locale === 'id' ? 'Arsip tidak ditemukan.' : 'Archives not found.'}</div>
            )}
        </div>
    );
};

NoteListArchive.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func,
};

export default NoteListArchive;
