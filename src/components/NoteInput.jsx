import React from 'react';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        };

        this.onTitleChangeEventHandler =
            this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler =
            this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value,
            };
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            };
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render() {
        return (
            <LocaleConsumer>
                {({ locale }) => {
                    return (
                        <form
                            className='note-input'
                            onSubmit={this.onSubmitEventHandler}
                        >
                            <input
                                className='note-input-item'
                                type='text'
                                placeholder={
                                    locale === 'id' ? 'Judul' : 'Title'
                                }
                                value={this.state.title}
                                onChange={this.onTitleChangeEventHandler}
                            />
                            <div
                                className='note-input-item'
                                placeholder='Write a note ...'
                                contentEditable
                                onInput={this.onBodyChangeEventHandler}
                            />
                            <button type='submit' className='note-input-item'>
                                {locale === 'id'
                                    ? 'Tambah Catatan'
                                    : 'Add Note'}
                            </button>
                        </form>
                    );
                }}
            </LocaleConsumer>
        );
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default NoteInput;
