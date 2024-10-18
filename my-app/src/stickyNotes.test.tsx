import { render, screen, fireEvent } from "@testing-library/react";
import{ StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);
        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });
    test("creates a new note", () =>{
        render(<StickyNotes/>);
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
    
        fireEvent.change(createNoteTitleInput, {target: {value: "New Note"}});
        fireEvent.change(createNoteContentTextarea, { target: {value: "Note Content"},});
    
        fireEvent.click(createNoteButton);
        
        const newNoteTitle = screen.getByText("New Note");
        const newNotecontent = screen.getByText("Note Content");
    
        expect(newNoteTitle).toBeInTheDocument();
        expect(newNotecontent).toBeInTheDocument();
    });
    
    
})

