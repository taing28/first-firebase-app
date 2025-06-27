const db = require('./dbConfig');
const todosRef = db.collection('todos');

/**
 * 
 * @returns {Promise<[{title: string, completed: boolean, id: string}]>}
 */
const findAll = async () => {
    const snapshot = await todosRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<{title: string, completed: boolean, id: string}>}
 */
const findById = async (id) => {
    const snapshot = await todosRef.doc(id).get();
    if (!snapshot.data()) {
        return null;
    }
    return { id, ...snapshot.data() };
}

/**
 * 
 * @param {{title: string, completed: boolean}} data 
 * @returns {Promise<{title: string, completed: boolean, id: string}>}
 */
const add = async (data) => {
    const newData = { ...data, completed: false };
    const response = await todosRef.add(newData);
    return { id: response.id, ...data };
}

/**
 * 
 * @param {string} id 
 * @param {{title: string, completed: boolean}} updateData 
 * @returns {Promise<{title: string, completed: boolean, id: string}>}
 */
const update = async (id, updateData) => {
    const snapshot = todosRef.doc(id);
    await snapshot.update(updateData);
    const updatedData = await snapshot.get();
    return { id, ...updatedData.data() };
}

/**
 * 
 * @param {string} id 
 */
const deleteById = async (id) => {
    await todosRef.doc(id).delete();
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<boolean>}
 */
const isExisted = async (id) => {
    const snapshot = await todosRef.doc(id).get();
    return snapshot.exists;
}

/**
 * 
 * @param {[{title: string, completed: boolean, id: string}, {title: string, completed: boolean, id: string}]} data 
 * @returns {Promise<[{title: string, completed: boolean, id: string}, {title: string, completed: boolean, id: string}]>}
 */
const updateMany = async (data) => {
    await db.runTransaction(async (transaction) => {
        // Read
        const docArray = [];
        for (const { id } of data) {
            const dataRef = todosRef.doc(id);
            await transaction.get(dataRef);
            docArray.push(dataRef);
        }

        // Write
        for (let i = 0; i < data.length; i++) {
            const { id, ...updateData } = data[i];
            transaction.update(docArray[i], updateData);
        }
    })

    // Return updated docs
    const updatedDocs = await Promise.all(
        data.map(async ({ id }) => {
            const snapshot = await todosRef.doc(id).get();
            return { id, ...snapshot.data() };
        }))
    return updatedDocs;
}

/**
 * 
 * @param {string[]} data 
 * @returns 
 */
const deleteMany = async (data) => {
    const batch = db.batch();

    for (const id of data) {
        const docRef = todosRef.doc(id);
        batch.delete(docRef);
    }

    await batch.commit();
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    deleteById,
    isExisted,
    updateMany,
    deleteMany
};