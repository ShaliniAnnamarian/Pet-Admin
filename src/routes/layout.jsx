import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StatusBar, View } from "react-native";
import Login from "../component/auth/login";
import StoreList from "../component/screen/storeList";
import RegisterLayout from "../component/screen/registrationScreen/registerLayout";
import RegisterForm from "../component/screen/registrationScreen/registerForm";


const Stack = createNativeStackNavigator();
export default function Layout() {

    const [isLogin, setIsLogin] = useState('');
    return (
        // isLogin&&
        <View style={{ flex: 1 }}>
            {/* <Text>test</Text> */}
            <StatusBar backgroundColor={'#ffff'} barStyle={"dark-content"} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="login">
                    <Stack.Group screenOptions={{ animation: 'slide_from_left' }}>
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false, unmountOnBlur: true }} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ animation: 'slide_from_left' }}>
                        <Stack.Screen name="storeList" component={StoreList} options={{ headerShown: false, unmountOnBlur: true }} />

                        <Stack.Screen name="registerLayout" component={RegisterLayout} options={{ headerShown: false, unmountOnBlur: true }} />

                        <Stack.Screen name="registerForm" component={RegisterForm} options={{ headerShown: false, unmountOnBlur: true }} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}