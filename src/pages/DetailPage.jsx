import parser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import { getNote } from '../utils/api';
import NotFoundPage from '../pages/NotFoundPage';
import { useState, useEffect } from 'react';

function DetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await getNote(id);
                setNote(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNote();
    }, [id]);

    if (!note) {
        return <NotFoundPage />;
    }

    return (
        <section>
            <h2>{note.title}</h2>
            <hr />
            <small className='grey'>{showFormattedDate(note.createdAt)}</small>
            <div className='content'>{parser(note.body)}</div>
        </section>
    );
}

export default DetailPage;
