// src/components/InvoiceForm.jsx
import React, { useState } from "react";
import { saveInvoice } from "../utils/db";
import { generateInvoicePDF } from "../utils/pdf";

const InvoiceForm = () => {
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [invoices, setInvoices] = useState([]);

    const handleAddInvoice = () => {
        const total = quantity * price;
        const newInvoice = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            items: [{ item, quantity, price }],
            total,
        };

        saveInvoice(newInvoice);
        setInvoices((prev) => [...prev, newInvoice]);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Invoice Generator</h1>
            <div className="mb-4">
                <label>Item</label>
                <input type="text" onChange={(e) => setItem(e.target.value)} />
            </div>
            <div className="mb-4">
                <label>Quantity</label>
                <input type="number" onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="mb-4">
                <label>Price</label>
                <input type="number" onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button onClick={handleAddInvoice} className="bg-blue-500 text-white py-2 px-4">Add Invoice</button>

            <div>
                <h2>Previous Invoices</h2>
                {invoices.map((invoice) => (
                    <div key={invoice.id}>
                        <p>Invoice #{invoice.id}</p>
                        <button onClick={() => generateInvoicePDF(invoice)}>Download PDF</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceForm;
