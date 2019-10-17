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
    addCommissioningDataUrl = 'http://10.0.2.2:3000/store_commission_sheet';

    signUpFireBase(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singInFireBase(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async StoreCommissionDataToDB(data) {
        const results = await fetch(this.addCommissioningDataUrl, {
            method: 'Post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        let sumbmitted = '';
        const savedCom = await results.json();
        if (results.status === 200) {
            console.log("Save Data to DB: ");
            sumbmitted = 'true';
        } else {
            console.error("Error saving data");
            sumbmitted = 'false';
        }
        return sumbmitted;
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
        if (results.status === 200) {
            console.log("Saved User to DB: ");
        }else {
            console.error('Error Saving DUser')
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

    passwordRecovery(email) {
        return firebaseCo.auth().sendPasswordResetEmail(email);
    }
}