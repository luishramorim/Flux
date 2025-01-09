import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { firestore } from "../config/firebase";

const createNewProduct = async (uid, productName, productAmount, productTag, productIcon) => {
    try {
        const productData = {
            productName,
            productAmount,
            productTag,
            productIcon
        };
        const productRef = await addDoc(collection(firestore, 'users', uid, 'products'), productData);

        console.log('Produto criado com sucesso!');
        console.log('ID do Produto:', productRef.id);
    } catch (error) {
        console.error('Erro ao criar produto:', error.message);
    }
}

const getAllProducts = (uid, callback) => {
    try {
        const productsRef = collection(firestore, 'users', uid, 'products');
        const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
            const products = [];

            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() });
            });

            console.log('Produtos atualizados:', products);
            callback(products);
        });

        return unsubscribe;

    } catch (error) {
        console.error('Erro ao obter produtos:', error.message);
        callback([]);
    }
};

const deleteProduct = async (userId, productId) => {
    try {
      await firestore.collection('users')
        .doc(userId)
        .collection('products')
        .doc(productId)
        .delete();
    } catch (error) {
      throw new Error("Erro ao deletar produto: " + error.message);
    }
};

export { createNewProduct, getAllProducts, deleteProduct };