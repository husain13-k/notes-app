package com.example.notesapp.controller;

import com.example.notesapp.model.Note;
import com.example.notesapp.service.NoteService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @GetMapping("/search")
    public List<Note> searchNotes(@RequestParam String keyword) {
        return noteService.searchNotes(keyword);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id,
                           @RequestBody Note note) {

        return noteService.updateNote(id, note);
    }

    @DeleteMapping("/{id}")
    public boolean deleteNote(@PathVariable Long id) {
        return noteService.deleteNote(id);
    }
}
