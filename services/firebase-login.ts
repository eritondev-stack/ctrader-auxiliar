import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase-app';
const auth = getAuth(app)

async function loginFirebase() {
    try {
        const login = await signInWithEmailAndPassword(auth, 'eriton.gomes.souza@outlook.com', 'E#@8712d')
        return login

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { loginFirebase }