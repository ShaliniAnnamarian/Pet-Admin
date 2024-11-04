import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { btnPrimary, f14, f16, f18, f20, f24, flexCenter, inputStyle, primaryFontMedium, primaryFontSemiBold } from '../../../styles/appStyles';
import { defBgColor, defTextColor } from '../../../styles/theme';
import { Menu, MenuItem } from 'react-native-material-menu';
import SortIcon from '../../../assets/images/sortIcon';
import { Image } from 'react-native-svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AddStoreIcon from '../../../assets/images/addStoreIcon';
import { useDispatch } from 'react-redux';
import LoaderCircle from '../../../utils/loaderActive';
import StoreCard from '../../comonComponent/storeCart';
import FilterIcon from '../../../assets/images/filterIcon';
import RadioBtnIcon from '../../../assets/images/radioBtnIcon';

const shopLists = [
    {
        name: 'Pet Paradaise',
        owner_name: 'Mr.B.Poornaprakash',
        mobile: '9876543210',
        street: 'No:15/12, Victory Colony',
        town: '6th Avenue Anna Nagar East',
        city: 'Chennai',
        pincode: '600102'
    },
    {
        name: 'GR Aquarium and Pets',
        owner_name: 'Mr.Giri',
        mobile: '9876543210',
        street: 'No:15/12, Victory Colony',
        town: '6th Avenue Anna Nagar East',
        city: 'Chennai',
        pincode: '600102'
    },
    {
        name: 'The Pets Store',
        owner_name: 'Mr.Krishna',
        mobile: '9876543210',
        street: 'No:15/12, Victory Colony',
        town: '6th Avenue Anna Nagar East',
        city: 'Chennai',
        pincode: '600102'
    },
    {
        name: 'Classic Pet Store',
        owner_name: 'Mr.Colince',
        mobile: '9876543210',
        street: 'No:15/12, Victory Colony',
        town: '6th Avenue Anna Nagar East',
        city: 'Chennai',
        pincode: '600102'
    },

]

const StoreList = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [shopList, setShopList] = useState(shopLists);
    const [updateCoords, setUpdateCoords] = useState({});
    const [paginationLimit, setPaginationLimit] = useState({});
    const [refreshing, setRefresh] = useState(false);
    const [sortActiveIndex, setSortActiveIndex] = useState();
    const [shopUrl, setShopUrl] = useState('');
    const [scrollEndReached, setScrollEndReached] = useState(false);
    const [loaderActive, setLoaderActive] = useState(true);
    const [loaderText, setLoaderText] = useState('');
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    //   useMemo(() => {
    //     // dispatch(fetchProductList());
    //     return () => {
    //     //   dispatch(resetPetlist()); //shoplist reset
    //     }
    //   }, []);
    //   useMemo(() => {
    //     // getShopList(COORDS_REDUCER);
    // //   }, [COORDS_REDUCER]);
    // }, []);



    //   // Store List Update
    //   useEffect(() => {
    //     if (STORE_REDUCER?.data?.data) {
    //       if (scrollEndReached) {
    //         setShopList([...shopList, ...STORE_REDUCER?.data?.data]);
    //       } else {
    //         setShopList([...STORE_REDUCER?.data?.data]);
    //       }
    //       setPaginationLimit(STORE_REDUCER?.data?.pagination);
    //       setRefresh(false);
    //       setScrollEndReached(false);
    //       setLoaderActive(false)
    //     }
    // //   }, [STORE_REDUCER]);
    // }, []);

    //   useEffect(() => {
    //     if (shopUrl !== '') {
    //     //   dispatch(fetchShopList(shopUrl));
    //     }
    //   }, [shopUrl, isFocused]);

    //   useEffect(() => {
    //     if (FAV_REDUCER?.data?.status == 'success') {
    //       setLoaderText(FAV_REDUCER?.data?.message);
    //       setLoaderActive(false);
    //     //   dispatch(fetchShopList(shopUrl));
    //     }
    // //   }, [FAV_REDUCER])
    // }, []);

    //   useEffect(() => {
    //     getData();
    // //   }, [BOTTOM_TAB_REDUCER]);
    // }, []);

    // Pull refresh
    const refreshFunc = useCallback(() => {
        setRefresh(true);
        // setShopList([]);
        // dispatch(fetchShopList('store'));
    }, []);


    //   useEffect(() => {
    //     if (DELETE_REDUCER?.data?.status == 'success') {
    //       setLoaderText(DELETE_REDUCER?.data?.message);
    //       setTimeout(() => {
    //         // dispatch(fetchShopList(shopUrl));
    //         setLoaderActive(false);
    //       }, 1000);
    //     }
    // //   }, [DELETE_REDUCER]);
    // }, []);


    //   // Getting Stored Coordinates

    //   const getData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('my_Coords');
    //       if (value !== null) {
    //         setUpdateCoords(JSON.parse(value));
    //       }
    //     } catch (e) {
    //       // error reading value
    //     }
    //   };
    //   // API call

    //   function getShopList(params) {
    //     if (params) {
    //     }
    //     const url = 'stores' + '';
    //     setShopUrl(url);
    //   }

    // On scroll End getting data
    const onScrollRefresh = () => {
        if (paginationLimit?.next_page_url) {
            setScrollEndReached(true);
            //   dispatch(fetchShopList(paginationLimit?.next_page_url));
        }
    };

    const sortObj = [
        { label: 'Sort by A-Z', filName: 'asc' },
        { label: 'Sort by Z-A', filName: 'desc' },
    ];
      // Fav icon clicked
      function clickedFav(i) {
        // setLoaderActive(true);
        setLoaderText('Added to Favorites')
      }

    //   // Store delete
    //   function storeDelete(uuid) {
    //     setLoaderActive(true);
    //     setLoaderText('Deleting Shop');
    //     // dispatch(deleteShop(uuid));
    //   }
    //   // =====================================

    //   function triggerSort(i) {
    //     setLoaderActive(true)
    //     const currFil = sortObj[i].filName;
    //     const url = shopUrl + `?sort_by=${currFil}`;
    //   }







    function EmptyShop() {

        return <View style={{ height: "auto", paddingTop: "40%", width: "100%", marginTop: "auto" }}>
            <Image style={{ aspectRatio: 2, height: "auto", width: "100%", ...flexCenter }} resizeMode='contain' source={require("../../../assets/images/empty-shop.png")} />
            <Text style={{ fontFamily: primaryFontMedium, textAlign: "center", fontSize: f18, color: "#000", paddingVertical: 10 }}>No stores added</Text>
            <TouchableOpacity onPress={() => navigation.navigate('register', { name: 'Registration' })} >
                <Text style={{ ...btnPrimary, paddingVertical: 9, marginTop: "2%" }}>Add stores</Text>
            </TouchableOpacity>
        </View>
    }
    // Headers 
    function HeaderList() {
        return (
            <View style={[styles.headerMain,{marginBottom:20}]}>
                <Text style={[styles.headerText]}>List of Stores</Text>
                {shopList?.length !== 0 &&
                    <View style={[styles.headerRowMain]}>
                        <Text style={[styles.rowLeftText]}>
                            Verified pet Stores - {paginationLimit?.total}
                        </Text>
                        <View style={[styles.rowRight]}>
                            <View style={{ width: 'auto' }}>
                                <Menu
                                    visible={visible}
                                    style={{ right: 20, width: 'auto', left: 'auto' }}
                                    anchor={
                                        <TouchableOpacity
                                            style={{ paddingLeft: 10, paddingRight: 5 }}
                                            onPress={() => showMenu()}>
                                            <SortIcon />
                                        </TouchableOpacity>
                                    }
                                    onRequestClose={hideMenu}>
                                    {sortObj.map((item, i) => {
                                        return (
                                            <MenuItem style={{}} key={item.filName + i}>
                                                <TouchableOpacity
                                                    style={[styles.filterMenuItem]}
                                                    onPress={() => {
                                                        setSortActiveIndex(i);
                                                        triggerSort(i)
                                                        hideMenu();
                                                    }}>
                                                    <RadioBtnIcon active={i == sortActiveIndex} />
                                                    <Text style={[styles.menuText]}>{item.label}</Text>
                                                </TouchableOpacity>
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </View>

                            <View style={[styles.seperator]}></View>
                            <TouchableOpacity
                                onPress={() => {
                                    // dispatch(updateBottomToggle(false));
                                }}>
                                <FilterIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }


    return (
        <>
            {/* {loaderActive ? 
       <LoaderCircle
        size="large"
        visible={loaderActive}
        textContent={loaderText}
      /> :  */}
            <SafeAreaView>
                <View
                    style={{
                        backgroundColor: defBgColor,
                        position: 'relative',
                        height: '100%',
                        paddingVertical: '2%',
                    }}>
                    <FlatList
                        style={{ paddingHorizontal: '5%' }}
                        ListHeaderComponent={<HeaderList />}
                        ListHeaderComponentStyle={{ backgroundColor: defBgColor }}
                        data={shopList}
                        ListEmptyComponent={
                            <EmptyShop />
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <StoreCard
                                    data={item}
                                    clickFavourite={e => clickedFav(e)}
                                    deleteProps={e => storeDelete(e)}
                                />
                            );
                        }}
                        stickyHeaderIndices={[0]}
                        refreshing={refreshing}
                        onRefresh={() => refreshFunc()}
                        onEndReached={() => onScrollRefresh()}
                        ListFooterComponent={() => {
                            return (
                                paginationLimit?.last_page !==
                                paginationLimit?.current_page && (
                                    <View style={{ paddingVertical: 10 }}>
                                        <ActivityIndicator size={'large'} color={'red'} />
                                    </View>
                                )
                            );
                        }}
                    />
                    <TouchableOpacity
                        style={[styles.addBtn, { top: '92%' }]}
                        onPress={() =>
                            navigation.navigate('registerLayout', { name: 'Registration' })
                        }
                    >
                        <AddStoreIcon />
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
            {/* }   */}
        </>
    )
}

export default StoreList

const styles = StyleSheet.create({
    headerMain: {},
    headerText: {
        textAlign: 'center',
        color: '#222222',
        fontSize: f24,
        fontFamily: 'Lexend-SemiBold',
        paddingVertical: 10
    },
    headerRowMain: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: '2%',
    },
    rowLeftText: { fontSize: f16, fontFamily: 'Lexend-Light', color: '#666666' },
    seperator: { height: '100%', width: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)' },
    rowRight: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    addBtn: {
        position: 'absolute',
        backgroundColor: '#07A4DE',
        borderRadius: 1000,
        right: '8%',
    },
    filterMenuItem: {
        ...flexCenter,
        justifyContent: 'flex-start',
        gap: 7,
    },
    menuText: {
        color: defTextColor,
        fontFamily: primaryFontMedium,
        fontSize: f14,
    },
    headerRowFilter: {
        ...flexCenter,
        position: 'relative',
        width: '100%',
    },
    filterHeader: {
        color: defTextColor,
        fontSize: f20,
        fontFamily: primaryFontSemiBold,
    },
    locationText: {
        color: defTextColor,
        fontSize: f16,
        fontFamily: primaryFontMedium,
    },
    inpSelect: {
        ...inputStyle({
        }),
        backgroundColor: "#F2F2F2"
    },
    lineHorizontal: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginVertical: 15,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        ...flexCenter,
        width: '100%',
    },
    sliderValText: {
        textAlign: "center"
    },
    cateMain: {
        ...flexCenter,
        justifyContent: "flex-start",
        gap: 10,
        marginVertical: 10
    },
    cateSubs: {
        borderRadius: 36,
        padding: 5,
        paddingHorizontal: 20
    },
    cateText: {
        fontSize: f14,
        fontFamily: primaryFontMedium
    },
    radiusKms: {
        ...flexCenter,
        justifyContent: "space-between"
    },
    radiusKmText: {
        fontSize: f14,
        fontFamily: primaryFontMedium
    }
})