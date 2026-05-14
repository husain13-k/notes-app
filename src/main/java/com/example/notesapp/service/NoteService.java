package com.example.notesapp.service;

import com.example.notesapp.model.Note;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final List<Note> notes = new ArrayList<>();
    private Long currentId = 1L;

    public List<Note> getAllNotes() {
        return notes;
    }

    public Note createNote(Note note) {
        note.setId(currentId++);
        notes.add(note);
        return note;
    }

    public List<Note> searchNotes(String keyword) {

        String lowerKeyword = keyword.toLowerCase();

        return notes.stream()
                .filter(note ->
                        note.getTitle().toLowerCase().contains(lowerKeyword)
                                ||
                                note.getBody().toLowerCase().contains(lowerKeyword)
                )
                .collect(Collectors.toList());
    }

    public Note updateNote(Long id, Note updatedNote) {

        for (Note note : notes) {

            if (note.getId().equals(id)) {

                note.setTitle(updatedNote.getTitle());
                note.setBody(updatedNote.getBody());

                return note;
            }
        }

        return null;
    }

    public boolean deleteNote(Long id) {

        return notes.removeIf(note -> note.getId().equals(id));
    }
}
