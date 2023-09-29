import { User, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { FIREBASE_AUTH } from "./FirebaseConfig"


const [user,setUser] = useState<User | null>(null)
  useEffect(() =>{
      onAuthStateChanged(FIREBASE_AUTH , (user) =>{
        console.log('user' ,user)
      })
  })