'use client';
import { useState } from 'react';
import styles from './page.module.css'

function ItemCount({count, name}: {count: number, name: string}) {
  return <div key={name}>{name} count: {count}</div>
};

const localProducts = [
  { name: 'Item 1', description: 'Foo' },
  { name: 'Item 2', description: 'Bar' },
  { name: 'Item 3', description: 'Baz' },
  { name: 'Item 4', description: 'Qux' },
] as const;

export default function Home() {
  const [items, setItems] = useState<{name: string, quantity: number}[]>([]);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // simple lookup function to remove repetitive item.find calls
  const itemLookup = items.reduce((acc, item) => ({...acc, [item.name]: item }), {} as Record<string, {name: string, quantity: number}>);

  const addToCart = (product: string) => {
    const alreadyInCart = items.find(item => item.name === product);
    if (alreadyInCart) {
      setItems(items.map(item => item.name === product 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      ));
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Michael&apos;s Amazing Web Store
        </p>
        <div>
          <button className={styles.basket}>
            Basket: {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </button>
          {localProducts.map(product => (
            <ItemCount 
              key={product.name}
              name={product.name} 
              count={itemLookup[product.name]?.quantity || 0}
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {localProducts.map(product => (
          <button
            key={product.name}
            className={styles.card}
            aria-label="Add to basket"
            onClick={() => addToCart(product.name)}
          >
            <h2>{product.name} <span>-&gt;</span></h2>
            <p>{product.description}</p>
          </button>
        ))}
      </div>
    </main>
  )
}
