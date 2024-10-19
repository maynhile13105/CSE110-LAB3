import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";
describe("ToDoList", () => {
    test("read items list",()=>{
        render(<ToDoList />);
        dummyGroceryList.forEach((item)=>{
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });

    });

    test("number of checked items", () => {
        render(<ToDoList />);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
        
        const item0 = screen.getByTestId(`${dummyGroceryList[0].name}-checkbox`);
        const item1 = screen.getByTestId(`${dummyGroceryList[0].name}-checkbox`);

        fireEvent.click(item0);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(item1);
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

        fireEvent.click(item0);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();



    });

})
