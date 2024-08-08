import { getDocs, getDoc, addDoc, deleteDoc, updateDoc, collection , doc, query, where} from "firebase/firestore";
import { auth, db } from "./FirebaseConfig";





export const userServices = {

    createDocument: async ({ title, content, UserId, createdAt }) => {
        const collectionRef = collection(db, "blog")
        try {
            return await addDoc(collectionRef, { title, content ,UserId , createdAt })
        } catch (error) {
            console.error(error)
        }
    },

    updateDocument: async (id,{ title, content }) => {
       const updaterDoc = doc(db, "blog", id)
        try {
             await updateDoc(updaterDoc, {
                title,
                content
            })
            const updatedDoc = await getDoc(updaterDoc)
            return updatedDoc.data()
        } catch (error) {
            console.error(error)
        }
    },

    getDocuments :async ()=>{
        const collectionRef = collection(db, "blog")
      try {
        return await getDocs(collectionRef)
      } catch (error) {
        console.error(error)
      }
    },

    /* getUserBlogs: async () => {
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }
    
        const userId = currentUser.uid; // Get the current user's ID
        const collectionRef = collection(db, "blog");
        const userBlogsQuery = query(collectionRef, where("UserId", "==", userId));
    
        try {
          const querySnapshot = await getDocs(userBlogsQuery);
          const blogs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          return blogs;
        } catch (error) {
          console.error(error);
        }
      }, */
    

    getDocument : async (id)=>{
        const singleDoc = doc(db, "blog", id)
        try {
            return await getDoc(singleDoc)
        } catch (error) {
            console.error(error)
        }
    },

    deleteDocument : async (id)=>{
        const deleterDoc = doc(db, "blog", id)
        try {
            return await deleteDoc(deleterDoc)
        } catch (error) {
            console.error(error)
        }
    }

}

