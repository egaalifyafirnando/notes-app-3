import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteListArchive from '../components/NoteListArchive';
import SearchBar from '../components/SearchBar';
import { getActiveNotes, deleteNote, getArchivedNotes, archiveNote, unarchiveNote } from '../utils/api';

const HomePageWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [defaultKeyword, setDefaultKeyword] = useState(searchParams.get('keyword'));

    const onKeywordChangeHandler = (keyword) => {
        setSearchParams({ keyword });
        setDefaultKeyword(keyword);
    };

    return <HomePage defaultKeyword={defaultKeyword} keywordChange={onKeywordChangeHandler} />;
};

const HomePage = ({ defaultKeyword, keywordChange }) => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState(defaultKeyword || '');
    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        const fetchData = async () => {
            const { data: notesData } = await getActiveNotes();
            const { data: archivedData } = await getArchivedNotes();

            setNotes([...notesData, ...archivedData]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const onDeleteHandler = async (id) => {
        await deleteNote(id);
        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();
        setNotes([...notesData, ...archivedData]);
    };

    const onArchiveHandler = async (id) => {
        await archiveNote(id);
        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();
        setNotes([...notesData, ...archivedData]);
    };

    const onUnarchiveHandler = async (id) => {
        await unarchiveNote(id);
        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();
        setNotes([...notesData, ...archivedData]);
    };

    const onKeywordChangeHandler = (newKeyword) => {
        setKeyword(newKeyword);
        keywordChange(newKeyword);
    };

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <section>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
            <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />
            <h2>{locale === 'id' ? 'Daftar Arsip' : 'Archives List'}</h2>
            <NoteListArchive notes={filteredNotes} onDelete={onDeleteHandler} onUnarchive={onUnarchiveHandler} />
        </section>
    );
};

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
