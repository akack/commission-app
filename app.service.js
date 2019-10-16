import React from "react";
import {
    AsyncStorage,
    Alert,
    Platform
} from 'react-native';
import * as firebase from "firebase";


export class AppService {
    addUserToDBUrl = 'http://10.0.2.2:3000/add_user_to_db';
    getUserDetailsUrl = 'http://10.0.2.2:3000/get_user_details';

    signUpFireBase(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singInFireBase(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async addUserToDB(user) {
        const results = await fetch(this.addUserToDBUrl, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })

        const savedCom = await results.json();
        console.log("Saved User to DB", savedCom);
        if (results.status === 200) {
            console.log("Saved User to DB", savedCom);
        }

    }

    async getUserDetails(uid) {
        const results = await fetch(`${this.getUserDetailsUrl}/${uid}`, {
            method: 'Get',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        const userDetails = await results.json();
        AsyncStorage.setItem('user', JSON.stringify(userDetails));
    }

    async logout() {
        await AsyncStorage.removeItem('user');
        return firebase.auth().signOut();
    }
}