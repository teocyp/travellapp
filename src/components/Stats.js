export default function Stats({ numItems, numPacked, packedPercent }) {
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
