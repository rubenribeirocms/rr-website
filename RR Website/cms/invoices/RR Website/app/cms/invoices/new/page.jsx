"use client";

import { useState } from "react";
import prisma from "@/lib/prisma";

export default async function NewInvoicePage() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" }
  });

  return <InvoiceForm customers={customers} />;
}

function InvoiceForm({ customers }) {
  const [items, setItems] = useState([
    { name: "", price: "" }
  ]);

  const addItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const setItemValue = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">New Invoice</h1>

      <form
        action="/api/invoices/create"
        method="POST"
        className="space-y-6 max-w-2xl"
      >
        {/* Customer */}
        <div>
          <label className="block mb-2">Customer</label>
          <select
            name="customerId"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option value="" disabled selected>
              Select…
            </option>

            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="block mb-2">Currency</label>
          <select
            name="currency"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>£</option>
            <option>AED</option>
            <option>KWD</option>
            <option>SAR</option>
            <option>€</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2">Status</label>
          <select
            name="status"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Pending</option>
          </select>
        </div>

        {/* VAT */}
        <div>
          <label className="block mb-2">VAT (%)</label>
          <input
            name="vat"
            type="number"
            step="0.1"
            className="w-full p-3 bg-black border border-white/20 rounded"
            placeholder="5"
          />
        </div>

        {/* Items */}
        <div>
          <h2 className="text-xl font-serif mb-3">Items</h2>

          {items.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-3">
              <input
                className="flex-1 p-3 bg-black border border-white/20 rounded"
                name={`item_name_${index}`}
                placeholder="Description"
                required
                value={item.name}
                onChange={(e) => setItemValue(index, "name", e.target.value)}
              />
              <input
                className="w-32 p-3 bg-black border border-white/20 rounded"
                name={`item_price_${index}`}
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                value={item.price}
                onChange={(e) => setItemValue(index, "price", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
          >
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
}
