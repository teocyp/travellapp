import { useState } from "react";
import Item from "./Item";

export default function PackingList({
    items,
    onDeleteItem,
    onPackItem,
    onClearList,
}) {
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
