
import { collection, doc, DocumentData, getDocs, getFirestore, setDoc, updateDoc } from '@firebase/firestore';
import { app } from '../../../services/firebase-app'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getPairs } from 'services/firebase-database';
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

/*     if (req.method === 'POST') {
        try {
            if (auth !== null) {
                await loginMyAccount()
            }
            const pairs: any[] = JSON.parse('[{ "category": "Major", "symbol": "EURUSD", "description": "EURO / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/EU.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "USDJPY", "description": "U.S. DOLLAR / JAPANESE YEN", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/JP.svg" }, { "category": "Major", "symbol": "GBPUSD", "description": "BRITISH POUND / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/GB.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "AUDUSD", "description": "AUSTRALIAN DOLLAR / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/AU.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "USDCAD", "description": "U.S. DOLLAR / CANADIAN DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/CA.svg" }, { "category": "Major", "symbol": "USDCHF", "description": "U.S. DOLLAR / SWISS FRANC", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/CH.svg" }, { "category": "Major", "symbol": "NZDUSD", "description": "NEW ZEALAND DOLLAR / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/NZ.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }]')
            await setDoc(doc(db, "symbols", 'admin'), {
                pairs
            });
            res.status(200).json({
                status: 'Create success',
            });
        } catch (e) {
            res.status(501).json(e);
        }
    } */
    if (req.method === 'PATCH') {
        try {
            if (auth !== null) {
                await loginMyAccount()
            }
            const pairs: any[] = JSON.parse('[{ "category": "Major", "symbol": "EURUSD", "description": "EURO / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/EU.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "USDJPY", "description": "U.S. DOLLAR / JAPANESE YEN", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/JP.svg" }, { "category": "Major", "symbol": "GBPUSD", "description": "BRITISH POUND / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/GB.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "AUDUSD", "description": "AUSTRALIAN DOLLAR / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/AU.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" }, { "category": "Major", "symbol": "USDCAD", "description": "U.S. DOLLAR / CANADIAN DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/CA.svg" }, { "category": "Major", "symbol": "USDCHF", "description": "U.S. DOLLAR / SWISS FRANC", "img_first": "https://s3-symbol-logo.tradingview.com/country/US.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/CH.svg" }, { "category": "Major", "symbol": "NZDUSD", "description": "NEW ZEALAND DOLLAR / U.S. DOLLAR", "img_first": "https://s3-symbol-logo.tradingview.com/country/NZ.svg", "img_second": "https://s3-symbol-logo.tradingview.com/country/US.svg" },{"category":"Minor","symbol":"EURGBP","description":"EURO / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"},{"category":"Minor","symbol":"EURAUD","description":"EURO / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"EURCAD","description":"EURO / CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"EURCHF","description":"EURO / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"EURJPY","description":"EURO / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"EURNZD","description":"EURO / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/EU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"GBPEUR","description":"BRITISH POUND / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"GBPJPY","description":"BRITISH POUND / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"GBPAUD","description":"BRITISH POUND / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"GBPCAD","description":"BRITISH POUND / CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"GBPCHF","description":"BRITISH POUND / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"GBPNZD","description":"BRITISH POUND / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/GB.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"JPYAUD","description":"JAPANESE YEN / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"JPYCAD","description":"JAPANESE YEN / CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"JPYCHF","description":"JAPANESE YEN / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"JPYEUR","description":"JAPANESE YEN / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"JPYGBP","description":"JAPANESE YEN / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"},{"category":"Minor","symbol":"JPYNZD","description":"JAPANESE YEN / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/JP.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"AUDCAD","description":"AUSTRALIAN DOLLAR/CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"AUDCHF","description":"AUSTRALIAN DOLLAR / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"AUDEUR","description":"AUSTRALIAN DOLLAR / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"AUDGBP","description":"AUSTRALIAN DOLLAR / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"},{"category":"Minor","symbol":"AUDJPY","description":"AUSTRALIAN DOLLAR / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"AUDNZD","description":"AUSTRALIAN DOLLAR / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/AU.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"CADAUD","description":"CANADIAN DOLLAR / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"CADCHF","description":"CANADIAN DOLLAR / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"CADEUR","description":"CANADIAN DOLLAR / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"CADGBP","description":"CANADIAN DOLLAR / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"},{"category":"Minor","symbol":"CADJPY","description":"CANADIAN DOLLAR / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"CADNZD","description":"CANADIAN DOLLAR / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/CA.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"CHFAUD","description":"SWISS FRANC / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"CHFCAD","description":"SWISS FRANC / CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"CHFEUR","description":"SWISS FRANC / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"CHFGBP","description":"SWISS FRANC / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"},{"category":"Minor","symbol":"CHFJPY","description":"SWISS FRANC / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"CHFNZD","description":"SWISS FRANC / NEW ZEALAND DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/CH.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/NZ.svg"},{"category":"Minor","symbol":"NZDAUD","description":"NEW ZEALAND DOLLAR / AUSTRALIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/AU.svg"},{"category":"Minor","symbol":"NZDCAD","description":"NEW ZEALAND DOLLAR / CANADIAN DOLLAR","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CA.svg"},{"category":"Minor","symbol":"NZDCHF","description":"NEW ZEALAND DOLLAR / SWISS FRANC","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/CH.svg"},{"category":"Minor","symbol":"NZDEUR","description":"NEW ZEALAND DOLLAR / EURO","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/EU.svg"},{"category":"Minor","symbol":"NZDJPY","description":"NEW ZEALAND DOLLAR / JAPANESE YEN","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/JP.svg"},{"category":"Minor","symbol":"NZDGBP","description":"NEW ZEALAND DOLLAR / BRITISH POUND","img_first":"https://s3-symbol-logo.tradingview.com/country/NZ.svg","img_second":"https://s3-symbol-logo.tradingview.com/country/GB.svg"}]')
            await updateDoc(doc(db, "symbols", 'admin'), {
                pairs
            });
            res.status(200).json({
                status: 'Create success',
            });
        } catch (e) {
            res.status(501).json(e);
        }
    }
    else if (req.method === 'GET') {
        
        if (auth !== null) {
            await loginMyAccount()
        }
        try {
            const symbols = await getPairs();

            res.status(200).json(symbols)
        } catch (error) {
            res.status(501).json({error: error.message})
        }


    } else {
        // Handle any other HTTP method
        res.status(401).json({
            error: 'method not permited'
        })
    }


}




