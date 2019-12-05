import React, { Component } from 'react';
import { css } from 'glamor'

import Form from './components/Form'
import Notes from './components/Notes'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { notes: [], filter: 'none' }
  createNote = async note => {
    const notes = [note, ...this.state.notes].reduce((acc, note) => {
      const index = acc.length
      acc[index]={ ...note, id: index }
      return acc;
    }, []);
    this.setState({ notes })
  }

  updateNote = async note => {
      const updatedNote = {
            ...note,
            status: note.status === 'new' ? 'completed' : 'new'
          }
    console.log(this.state.notes);
      const index = this.state.notes.findIndex(i => i.id === note.id)
      const notes = [...this.state.notes]
      notes[index] = updatedNote
    console.log(notes, note, index)
      this.setState({ notes })
  }

  deleteNote = async note => {
      const input = { id: note.id }
      const notes = this.state.notes.filter(n => n.id !== note.id)
      this.setState({ notes })
  }

  updateFilter = filter => this.setState({ filter })

  render() {
    let { notes, filter } = this.state
    if (filter === 'completed') {
      notes = notes.filter(n => n.status === 'completed')
    }
    if (filter === 'new') {
      notes = notes.filter(n => n.status === 'new')
    }
    return (
      <div {...css(styles.container)}>
        <p {...css(styles.title)}>Notes</p>
        <Form
          createNote={this.createNote}
        />
        <Notes
          notes={notes}
          deleteNote={this.deleteNote}
          updateNote={this.updateNote}
        />
        <div {...css(styles.bottomMenu)}>
          <p
            onClick={() => this.updateFilter('none')}
            {...css([ styles.menuItem, getStyle('none', filter)])}
          >All</p>
          <p
            onClick={() => this.updateFilter('completed')}
            {...css([styles.menuItem, getStyle('completed', filter)])}
          >Completed</p>
          <p
            onClick={() => this.updateFilter('new')}
            {...css([styles.menuItem, getStyle('new', filter)])}
          >Pending</p>
        </div>
      </div>
    );
  }
}

function getStyle(type, filter) {
  if (type === filter) {
    return {
      fontWeight: 'bold'
    }
  }
}

const styles = {
    container: {
          width: 360,
          margin: '0 auto',
          borderBottom: '1px solid #ededed',
        },
    form: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
    input: {
          height: 35,
          width: '360px',
          border: 'none',
          outline: 'none',
          marginLeft: 10,
          fontSize: 20,
          padding: 8,
        }
}


export default App;
