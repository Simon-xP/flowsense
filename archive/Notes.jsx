import React, { useEffect, useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjsLib from 'pdfjs-dist';
import api from '../api'; // Import the API utility
import '../styles/Home.css'; // Import CSS file for highlighting

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PDFViewer = () => {
  const viewerRef = useRef(null);
  const [highlightedSpan, setHighlightedSpan] = useState(null);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const handleTextDoubleClick = async (event) => {
      const target = event.target;

      if (target && target.classList.contains('rpv-core__text-layer-text')) {
        // Remove highlight from previously highlighted span
        if (highlightedSpan) {
          highlightedSpan.classList.remove('highlight');
        }

        // Highlight the clicked span
        target.classList.add('highlight');
        setHighlightedSpan(target);

        // Gather text from the surrounding context
        const page = target.closest('.rpv-core__page');
        const spans = Array.from(page.querySelectorAll('.rpv-core__text-layer-text'));
        const index = spans.indexOf(target);

        const textAbove = spans.slice(Math.max(0, index - 5), index).map(span => span.textContent).join(' ');
        const textBelow = spans.slice(index + 1, Math.min(spans.length, index + 6)).map(span => span.textContent).join(' ');
        const currentText = target.textContent;

        try {
          const response = await api.post('/api/explain/', {
            text_above: textAbove,
            text_below: textBelow,
            current_text: currentText
          });
          setGptResponse(response.data.explanation);
        } catch (err) {
          alert('Failed to get explanation.');
        }
      }
    };

    const container = viewerRef.current;
    container.addEventListener('dblclick', handleTextDoubleClick);

    return () => {
      container.removeEventListener('dblclick', handleTextDoubleClick);
    };
  }, [highlightedSpan]);

  useEffect(() => {
    // Fetch existing notes from the backend when the component mounts
    getNotes();
  }, []);

  const getNotes = () => {
    api.get('/api/notes/')
      .then((res) => setNotes(res.data))
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post('/api/notes/', { content: note, title })
      .then((res) => {
        if (res.status === 201) {
          alert('Note created!');
          getNotes(); // Refresh the notes list
        } else {
          alert('Failed to create note.');
        }
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('Note deleted!');
          getNotes(); // Refresh the notes list
        } else {
          alert('Failed to delete note.');
        }
      })
      .catch((err) => alert(err));
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <div
        ref={viewerRef}
        style={{ flex: 1, overflow: 'auto', position: 'relative' }}
      >
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}>
          <Viewer
            fileUrl="./example_research_paper.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
      <div style={{ width: '300px', padding: '10px', borderLeft: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
        <h3>Create a Note</h3>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            name="content"
            required
            value={note}
            onChange={handleNoteChange}
            style={{ width: '100%', height: '150px' }}
          ></textarea>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <h3>Existing Notes</h3>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}:</strong> {note.content}
              <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {gptResponse && (
          <div style={{ marginTop: '20px' }}>
            <h3>GPT Explanation</h3>
            <p>{gptResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
