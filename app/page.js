"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
  });

  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({
        name: "",
        price: "",
      });
    }
  };

  // Read item from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemArr = [];

      querySnapshot.forEach((doc) => {
        itemArr.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setItems(itemArr);

      // calculate total from itemArr
      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };

      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  console.log(items);

  // Delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center flex flex-col justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-5 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              className="col-span-3 p-3 border"
              type="text"
              onChange={(e) => {
                setNewItem({
                  ...newItem,
                  name: e.target.value,
                });
              }}
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              className="col-span-2 p-3 border mx-3"
              type="number"
              onChange={(e) => {
                setNewItem({
                  ...newItem,
                  price: e.target.value,
                });
              }}
              placeholder="Enter Amount"
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3 ">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
