import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NoteListArchive from '../components/NoteListArchive';
import SearchBar from '../components/SearchBar';
import {
    getActiveNotes,
    deleteNote,
    getArchivedNotes,
    archiveNote,
    unarchiveNote,
} from '../utils/api';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return (
        <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
    );
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            keyword: props.defaultKeyword || '',
            isLoading: true,
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();

        this.setState(() => {
            return {
                notes: [...notesData, ...archivedData],
                isLoading: false,
            };
        });
    }

    async onDeleteHandler(id) {
        await deleteNote(id);

        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();

        this.setState(() => {
            return {
                notes: [...notesData, ...archivedData],
            };
        });
    }

    async onArchiveHandler(id) {
        await archiveNote(id);

        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();

        this.setState(() => {
            return {
                notes: [...notesData, ...archivedData],
            };
        });
    }

    async onUnarchiveHandler(id) {
        await unarchiveNote(id);

        const { data: notesData } = await getActiveNotes();
        const { data: archivedData } = await getArchivedNotes();

        this.setState(() => {
            return {
                notes: [...notesData, ...archivedData],
            };
        });
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            };
        });

        this.props.keywordChange(keyword);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title
                .toLowerCase()
                .includes(this.state.keyword.toLowerCase());
        });

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <LocaleConsumer>
                {({ locale }) => {
                    return (
                        <section>
                            <SearchBar
                                keyword={this.state.keyword}
                                keywordChange={this.onKeywordChangeHandler}
                            />
                            <h2>
                                {locale === 'id'
                                    ? 'Daftar Kontak'
                                    : 'Contacts List'}
                            </h2>
                            <NoteList
                                notes={notes}
                                onDelete={this.onDeleteHandler}
                                onArchive={this.onArchiveHandler}
                            />
                            <h2>
                                {locale === 'id'
                                    ? 'Daftar Arsip'
                                    : 'Archives List'}
                            </h2>
                            <NoteListArchive
                                notes={notes}
                                onDelete={this.onDeleteHandler}
                                onUnarchive={this.onUnarchiveHandler}
                            />
                        </section>
                    );
                }}
            </LocaleConsumer>
        );
    }
}

HomePage.propTypes = {
    defaultKeyword: PropTypes.string,
    keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
