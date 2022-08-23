
import { collection, doc, DocumentData, getDocs, getFirestore, setDoc, updateDoc } from '@firebase/firestore';
import { app } from '../../../services/firebase-app'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(app);

async function loginMyAccount() {
    signInWithEmailAndPassword(auth, 'eriton.gomes.souza@gmail.com', 'E#@8712d')
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //console.log(userCredential)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.log(errorMessage)
        });
}

const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
    if (req.method === 'POST') {
        try {
            if (auth !== null) {
                await loginMyAccount()
            }
            await setDoc(doc(db, "users", 'eriton.gomes.souza@gmail.com'), {
            });
            res.status(200).json({
                status: 'Create success',
            });
        } catch (e) {
            res.status(501).json(e);
        }
    }
    if (req.method === 'PATCH') {
        try {
            if (auth !== null) {
                await loginMyAccount()
            }
            await updateDoc(doc(db, "users", 'eriton.gomes.souza@gmail.com'), {
                mais: true,
                outro: false
            });
            res.status(200).json({
                status: 'Create success',
            });
        } catch (e) {
            res.status(501).json(e);
        }
    }
    else if (req.method === 'GET') {
        //await auth.signOut()
         if (auth !== null) {
            await loginMyAccount()
        } 
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            let users: {
                id: string,
                data: DocumentData
            }[] = []
            querySnapshot.forEach((item) => {
               const value = { 
                   id: item.id,
                   data: item.data()
            }
            users.push(value)
            })
            res.status(200).json(users)
        } catch (error) {
            res.status(501).json(error)
        }


    } else {
        // Handle any other HTTP method
        res.status(401).json({
            error: 'method not permited'
        })
    }


}




