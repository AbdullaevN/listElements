import React, { useState } from "react";
import { Item as ItemType } from "../types/Item";

const Item: React.FC<{ item: ItemType; onRemove: (id: number) => void; onEdit: (id: number, updatedItem: Partial<ItemType>) => void }> = ({ item, onRemove, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedName, setUpdatedName] = useState(item.name);

    const handleEdit = () => {
        onEdit(item.id, { name: updatedName });
        setIsEditing(false);
    };

    return (
        <div>
            <h3>{item.name}</h3>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <button onClick={handleEdit}>Сохранить</button>
                </div>
            ) : (
                <div className="buttons">
                    <button onClick={() => setIsEditing(true)}>Редактировать</button>
                    <button onClick={() => onRemove(item.id)}>Удалить</button>
                </div>
            )}
        </div>
    );
};

export default Item;
