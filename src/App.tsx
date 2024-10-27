import React from "react";
import ItemList from "./components/ItemList";

const App: React.FC = () => {
    return (
        <div>
            <h1>Список элементов</h1>
            <ItemList />
        </div>
    );
};

export default App;