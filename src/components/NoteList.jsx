import PropTypes from 'prop-types';
import { useContext } from 'react';
import NoteItem from './NoteItem';
import LocaleContext from '../contexts/LocaleContext';

const NoteList = ({ notes, onDelete, onArchive }) => {
    const { locale } = useContext(LocaleContext);
    const activeNotes = notes.filter((note) => !note.archived);

    return (
        <div className='note-list'>
            {activeNotes.length ? (
                activeNotes.map((note) => (
                    <NoteItem
                        key={note.id}
                        id={note.id}
                        onDelete={onDelete}
                        onArchive={onArchive}
                        {...note}
                    />
                ))
            ) : (
                <div className='note-items'>
                    {locale === 'id'
                        ? 'Catatan tidak ditemukan.'
                        : 'Notes not found.'}
                </div>
            )}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default NoteList;
