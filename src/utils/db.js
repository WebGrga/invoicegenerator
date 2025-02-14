// src/utils/db.js
export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("invoicesDB", 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("invoices")) {
                db.createObjectStore("invoices", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onerror = (e) => reject(e);
        request.onsuccess = (e) => resolve(e.target.result);
    });
};

export const saveInvoice = async (invoice) => {
    const db = await openDB();
    const transaction = db.transaction("invoices", "readwrite");
    const store = transaction.objectStore("invoices");
    store.add(invoice);

    transaction.oncomplete = () => {
        db.close();
    };
};

export const getInvoices = async () => {
    const db = await openDB();
    const transaction = db.transaction("invoices", "readonly");
    const store = transaction.objectStore("invoices");
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e);
    });
};
