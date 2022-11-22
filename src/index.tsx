import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.less';
import App from './App';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDWxFFRzRenWNaVjWlagwYKJEsvIDm7A9A",
    authDomain: "todo-react-fdad0.firebaseapp.com",
    projectId: "todo-react-fdad0",
    storageBucket: "todo-react-fdad0.appspot.com",
    messagingSenderId: "826286782264",
    appId: "1:826286782264:web:c79ae67431c632b31933cd",
    measurementId: "G-2ET1VD6Q85"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <App/>
)
;

