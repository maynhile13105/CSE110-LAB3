import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";
import { Label } from "./types";

describe("StickyNote", () => {
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
    
    test("read notes", () => {
        render(<StickyNotes/>);
        //Test that all notes in dummyNoteList are read
        dummyNotesList.forEach((testingNote)=>{
            const readingNoteTitle = screen.getByText(testingNote.title);
            const readingNoteContent = screen.getByText(testingNote.content);
            expect(readingNoteTitle).toBeInTheDocument();
            expect(readingNoteContent).toBeInTheDocument();
        });

    });

    
    test("update a note", () => {
        render(<StickyNotes/>);
        const updatedTitle = "Updated Note Title";
        const updatedContent = "Updated Note Content";
        //Assume this note is in favorite list
        fireEvent.click(screen.getByTestId(`heart-${dummyNotesList[0].id}`));
        //update title of note[0]
        const updatingNoteTitle = screen.getByTestId(`title-${dummyNotesList[0].id}`);
        fireEvent.focus(updatingNoteTitle);
        fireEvent.input(updatingNoteTitle, {target: {innerHTML: updatedTitle}});
        fireEvent.blur(updatingNoteTitle);
        
        //update content of note[0]
        const updatingNoteContent = screen.getByTestId(`content-${dummyNotesList[0].id}`);
        fireEvent.focus(updatingNoteContent);
        fireEvent.input(updatingNoteContent, {target: {innerHTML: updatedContent}});
        fireEvent.blur(updatingNoteContent);

        expect(updatingNoteTitle.innerHTML).toBe(updatedTitle);
        expect(updatingNoteContent.innerHTML).toBe(updatedContent);
        //Check that if the note is in the favorite list, it will also be changed
        expect(screen.queryByTestId(dummyNotesList[0].title)).not.toBeInTheDocument();
        expect(screen.getAllByText(updatedTitle).length).toBe(2);
    });
    
    test("delete a note",()=>{
        const deletedNote = dummyNotesList[5];
        render(<StickyNotes />);

        //Verify the note is present before deletion
        expect(screen.getByTestId(`title-${deletedNote.id}`)).toHaveTextContent(deletedNote.title);
        expect(screen.getByTestId(`content-${deletedNote.id}`)).toHaveTextContent(deletedNote.content);

        //Click on x button of note[0]
        const xButton = screen.getByTestId(`x-${deletedNote.id}`);
        fireEvent.click(xButton);

        expect(screen.queryByTestId(`title-${deletedNote.id}`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`content-${deletedNote.id}`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`fav-${deletedNote.id}`)).not.toBeInTheDocument();
    });

    test("No note", () => {
        render(<StickyNotes />);
        //Delete all notes in the list
        dummyNotesList.forEach((note) => {
            const xButton = screen.getByTestId(`x-${note.id}`);
            fireEvent.click(xButton);
        })

        expect(screen.getByText("There is no note!")).toBeInTheDocument();
    })
    
})

