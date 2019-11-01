import React from "react";
import {
    AsyncStorage
} from 'react-native';
import * as firebase from "firebase";


export class AppService {
    addUserToDBUrl = 'https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/add_user_to_db';
    getUserDetailsUrl = 'https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/get_user_details';
    saveCommisionSheetUrl = 'https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/save_commission_sheet';
    /*
     POST - https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/add_user_to_db
        GET - https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/get_user_details/{uidFB}
        POST - https://fm2rj65ye9.execute-api.us-east-1.amazonaws.com/dev/save_commission_sheet
    */

    signUpFireBase(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singInFireBase(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async StoreCommissionDataToDB(data) {
        const results = await fetch(this.saveCommisionSheetUrl, {
            method: 'Post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        let sumbmitted = true;
        const commission = await results.json();
        if (commission.errorMessage === 'Error while loading GetUserDetails') {
            sumbmitted = false;
        }
        return sumbmitted
    }

    async addUserToDB(user) {
        const results = await fetch(this.addUserToDBUrl, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
        let sumbmitted = true;
        const userDetails = await results.json();
        if (userDetails.errorMessage === 'Error while loading GetUserDetails') {
            sumbmitted = false;
        }
        return sumbmitted
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
        let sumbmitted = true;
        if (userDetails.errorMessage === 'Error while loading GetUserDetails') {
            sumbmitted = false;
        }
        return sumbmitted
    }

    async logout() {
        await AsyncStorage.removeItem('user');
        return firebase.auth().signOut();
    }

    passwordRecovery(email) {
        return firebase.auth().sendPasswordResetEmail(email);
    }
}