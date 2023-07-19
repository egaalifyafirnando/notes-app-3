import PropTypes from 'prop-types';
import NoteItemBody from './NoteItemBody';
import NoteItemFooter from './NoteItemFooter';

const NoteItem = ({ title, body, archived, createdAt, id, onDelete, onArchive, onUnarchive }) => {
    return (
        <div className='note-items'>
            <div className='note-item'>
                <NoteItemBody title={title} body={body} createdAt={createdAt} />
                <NoteItemFooter
                    id={id}
                    archived={archived}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                />
            </div>
        </div>
    );
};

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
};

export default NoteItem;
