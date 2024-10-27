import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { itemStore } from "../stores/ItemStore";
import Item from "./Item";
import Loader from "./Loader";

const ItemList: React.FC = observer(() => {
    const loadMoreItems = () => {
        if (!itemStore.isLoading) {
            itemStore.fetchItems();
        }
    };

    useEffect(() => {
        itemStore.fetchItems(); // Начальная загрузка
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreItems();
        }
    };

    return (
        <div>
            {itemStore.items.map(item => (
                <Item 
                    key={item.id}  
                    item={item} 
                    onRemove={itemStore.removeItem} 
                    onEdit={(id, updatedItem) => itemStore.editItem(id, updatedItem)}  
                />
            ))}
            {itemStore.isLoading && <Loader />}
        </div>
    );
});

export default ItemList;
