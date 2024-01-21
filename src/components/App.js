import { useState } from "react";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Form from "./Form";
import Stats from "./Stats";

function App() {
    const [items, setItems] = useState([]);

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const packedPercent = Math.round((numPacked / numItems) * 100);

    const handleAddItems = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const handlePacked = (id) => {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    };

    const handleClearList = () => {
        const confirmed = window.confirm(
            "Are you sure to delete all the items?"
        );
        if (confirmed) setItems([]);
    };

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onPackItem={handlePacked}
                onClearList={handleClearList}
            />
            <Stats
                numItems={numItems}
                numPacked={numPacked}
                packedPercent={packedPercent}
            />
        </div>
    );
}

export default App;
