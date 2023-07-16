import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteList({ notes, onDelete, onUnarchive }) {
    const archiveNotes = notes.filter((note) => note.archived == true);
    return (
        <div className='note-list'>
            {archiveNotes.length ? (
                archiveNotes.map((note) => (
                    <NoteItem
                        key={note.id}
                        id={note.id}
                        onDelete={onDelete}
                        onUnarchive={onUnarchive}
                        {...note}
                    />
                ))
            ) : (
                <LocaleConsumer>
                    {({ locale }) => {
                        return (
                            <div className='note-items'>
                                {locale === 'id'
                                    ? 'Arsip tidak ditemukan.'
                                    : 'Archives not found.'}
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
    onUnarchive: PropTypes.func,
};

export default NoteList;
