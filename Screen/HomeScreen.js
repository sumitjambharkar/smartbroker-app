import { View, Text, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView,Image} from 'react-native'
import React, { useState, useRef,useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import OTPTextInput from 'react-native-otp-textinput'
import firebase from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../firebase-config';

function HomeScreen() {
    
    const navigation = useNavigation()
    const [show, setShow] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    


    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber("+91" + phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
            setShow(false)
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
                console.log(result);
            })
            .catch((error)=>{
                console.log(error);
                navigation.navigate("Home")
            })
            
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{alignItems:"center"}}>
                <Image style={{width:100,height:100}} source={require('../assets/sd.png')}/>
                </View>
                <Text style={styles.h1}>SMART BROKER INFO</Text>
                <Text style={{textAlign:"center",color:"#d30101",fontWeight:"700"}}>BUY - SALE - RENT</Text>
                <Text style={styles.h2}>Hi Boss</Text>
                <Text style={styles.h3}>Login Now </Text>
                {show? <>
                    <Text style={styles.label}>Enter Number</Text>
                <TextInput autoCompleteType="tel" keyboardType='phone-pad' maxLength={10} onChangeText={setPhoneNumber} style={styles.input} placeholder='Mobile Number' />
                <TouchableOpacity onPress={sendVerification}>
                <Text style={styles.button}>Continue</Text>
                </TouchableOpacity>
                </> : <>
                <Text style={styles.label}>Enter OTP</Text>
                <OTPTextInput style={styles.input_otp}
                    inputCount={6}
                    handleTextChange={setCode} />
                <TouchableOpacity onPress={confirmCode}>
                    <Text style={styles.button}>Send Verification</Text>
                </TouchableOpacity>
                </>}
                
                </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 20,
        marginTop:"30%"
    },
    h1: {
        color: 'black',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    h2: {

        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,

    },

    h3: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        padding: 8,
        borderRadius: 8,

    },
    input_otp: {
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        padding: 8,
        borderRadius: 8,
        textAlign:"center"

    },

    button: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'blue',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },

})