import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteList({ notes, onDelete, onArchive }) {
    const activeNotes = notes.filter((note) => note.archived == false);

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
                <LocaleConsumer>
                    {({ locale }) => {
                        return (
                            <div className='note-items'>
                                {locale === 'id'
                                    ? 'Catatan tidak ditemukan.'
                                    : 'Notes not found.'}
                            </div>
                        );
                    }}
                </LocaleConsumer>
            )}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
};

export default NoteList;
