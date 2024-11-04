import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import InpCtrl from '../comonComponent/inputCtrl'
import { useForm } from 'react-hook-form';
import Button from '../comonComponent/button';
import { black, primaryColor, white } from '../../styles/theme';
import { f11, f12, f14, f15, f20, f22, f30 } from '../../styles/appStyles';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const isSmallDevice = WIDTH < 395;
const Login = () => {
    const { control, handleSubmit } = useForm();

    const navigation = useNavigation()
    const statusBarCurrent = useRef();

    const onSubmit =(data)=>{
        console.log('data',data);
        navigation.navigate('storeList');
    }

    return (
        <View style={styles.main}>

            <ImageBackground
                style={styles.loginBg}
                source={require('../../assets/images/bg_paws_block.webp')}>
                <StatusBar ref={statusBarCurrent} backgroundColor={'transparent'} translucent={true}></StatusBar>
                <View style={{ width: '100%', height: "30%", flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={[styles.leftMain]}>
                        <Text style={[styles.textHeader]} numberOfLines={1}>PawPals</Text>
                        <Text style={[styles.textSubHeader]}>Local pet stores, Clubs, Day care, Beauticians for your pets</Text>
                    </View>
                  
                    <View style={{ width: "40%", height: "80%" }}>
                        <Image source={require('../../assets/images/login_doggy.png')} style={{ width: "100%", height: "100%" }} />
                    </View>
                </View>
                <View style={styles.loginPop}>
                    <Text style={{ color: black, fontSize: f20, textAlign: 'center', fontFamily: 'Merienda-Bold', }}>Login</Text>
                    <View style={{ marginTop: "5%", marginBottom: "12%", flexDirection: 'column', gap: '30%' }}>
                        <InpCtrl
                            label=""
                            placeholderText="Enter mail id"
                            controlName="email"
                            control={control}
                            errMesg="This field is required"
                            type="email-address"
                            rules={{
                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                required: true,
                            }}
                        />

                        <InpCtrl
                            label=""
                            placeholderText="Enter password"
                            controlName="password"
                            control={control}
                            errMesg="This field is required"
                            type="view-password"
                            rules={{ required: true }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
                            <Text style={{ color: primaryColor, fontSize: f11 }}>Forgot Password?</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button name={"Login"} onPress={handleSubmit(onSubmit)} />
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    loginBg: {
        flex: 1,
        padding: "5%",
    },
    loginPop: {
        width: "100%",
        height: "60%",
        backgroundColor: '#fff',
        padding: "5%",
        borderRadius: 20,
    },
    leftMain: {
        flex: isSmallDevice ? 3.5 : 3,
    },
    textHeader: {
        color: '#FFFFFF',
        fontFamily: 'Merienda-Bold',
        fontSize: f30,
    },
    textSubHeader: {
        fontFamily: 'Merienda-Medium',
        color: '#fff',
        paddingBottom: 10,
        fontSize: f14,
    },

})