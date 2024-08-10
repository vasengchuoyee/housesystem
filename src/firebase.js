import firebase from 'firebase'
import { onUnmounted } from 'vue'
import { ref, onUnmounted } from 'vue' 

const config = {
    apiKey: "AIzaSyCrHlRRRVjeO2e0kDXK5jj9H1oPjNEpAEo",
    authDomain: "vue3-crud-55277.firebaseapp.com",
    projectId: "vue3-crud-55277",
    storageBucket: "vue3-crud-55277.appspot.com",
    messagingSenderId: "490872575921",
    appId: "1:490872575921:web:8330c235359a96e5694f90",
    measurementId: "G-RR3K8CN3TP"
  }

  const firebaseApp = firebase.initializeApp(config)

  const db = firebaseApp.firebase()
  const usersCollection = db.callection('users')

  export const createUser = user => {
    return usersCollection.add(user)
  }

  export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
  }

  export const updatedUser = (id, user) => {
    return usersCollection.doc(id).update(user)
    
  }

  export const deleteUser = id => {
    return usersCollection.doc(id).delete()
  }
  export const useLoadUsers = () => {
    
  }
