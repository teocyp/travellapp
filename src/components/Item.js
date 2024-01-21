export default function Item({ item, onDeleteItem, onPackItem }) {
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
