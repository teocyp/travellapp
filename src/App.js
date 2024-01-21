import { useState } from "react";

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

function Logo() {
    return <h1>🏝️🧳 Far Away Travel</h1>;
}
function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    )
                )}
            </select>
            <input
                type="text"
                placeholder="Enter your item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}
function PackingList({ items, onDeleteItem, onPackItem, onClearList }) {
    const [sortBy, setSortBy] = useState("byinput");

    let sortedItems;

    if (sortBy === "byinput") sortedItems = items;

    if (sortBy === "bydescription")
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === "bypackedstatus")
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onPackItem={onPackItem}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="byinput">Sort by input order</option>
                    <option value="bydescription">Sort by description</option>
                    <option value="bypackedstatus">
                        Sort by packed status
                    </option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
}

function Item({ item, onDeleteItem, onPackItem }) {
    return (
        <li key={item.id}>
            <input
                type="checkbox"
                name="checkbox"
                value={item.packed}
                onChange={() => onPackItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({ numItems, numPacked, packedPercent }) {
    if (!numItems)
        return (
            <p className="stats">
                <em>Start packing your items now. 🚀</em>
            </p>
        );
    return (
        <footer className="stats">
            {packedPercent === 100 ? (
                <em>
                    🧳 Congratulations. You have packed all of your items. 😍
                </em>
            ) : (
                <em>
                    🧳 You have {numItems} items on your list and you already
                    packed {numPacked} item which is {packedPercent}%
                </em>
            )}
        </footer>
    );
}
