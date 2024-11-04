import React, {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Menu, MenuItem} from 'react-native-material-menu';
// import { addToFavourite } from '../../../service/asyncUpdates/favShopAdded';
import MoreDots from '../../assets/images/moreDot';
import VerifiedIcon from '../../assets/images/verifiedIcon';
import HeartIcon from '../../assets/images/heartIcon';
import { CallIcon } from '../../assets/images/callIcon';
import LocationGray from '../../assets/images/locationGray';
import { f12, f14, f16, f18, flexCenter, primaryFontLight, primaryFontMedium, primaryFontRegular, primaryFontSemiBold } from '../../styles/appStyles';
import { defTextColor } from '../../styles/theme';
import { DeleteShop, EditShop } from '../../assets/images/storeCartIcon';

const HEIGHT = Dimensions.get('window').height;
const isSmallDevice = HEIGHT < 820;

const StoreCard = React.memo(({data, clickFavourite,deleteProps,isFavScreen}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const onClickItem = () => {
    navigation.navigate('shop-view', {name: 'shop-view', shopId: data.uuid,isfromFav:isFavScreen ? true : false});
  };

  const editClick = () => {
    navigation.navigate('shop-edit', {name: 'shop-edit', shopId: data.uuid});
  };
  const deleteClick =()=>{
    deleteProps(data.uuid);
    setVisible(false);
  }
  
  
  function favStoreAdded(i){
    // dispatch(addToFavourite(i))
    clickFavourite(i)
  }

  return (
    <TouchableOpacity style={[styles.mainCard]} onPress={() => onClickItem()}>
      <View style={[styles.leftBorder]}></View>
      <View style={{flex: 1, paddingHorizontal: '5%', paddingVertical: 5}}>
        <View style={[styles.rowHeaderMain]}>
          <View style={{flex:0.76}}>

          <View style={{width:"100%"}} >
            <Text style={[styles.shopName]}>{data.name}</Text>
          </View>
          </View>
          <View style={[styles.headerRight,{flex:0.4}]}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={[styles.verifiedText]}>Verified</Text>
              <VerifiedIcon />
              {
                !isFavScreen &&
              <Menu
                visible={visible}
                style={{height: 'auto', borderRadius: 7}}
                anchor={
                  <TouchableOpacity
                    style={{paddingLeft: 10, paddingRight: 5}}
                    onPress={showMenu}>
                    <MoreDots />
                  </TouchableOpacity>
                }
                onRequestClose={hideMenu}>
                <MenuItem
                  onPress={editClick}
                  style={{height: 'auto', paddingVertical: 5}}>
                  <TouchableOpacity
                    style={{...flexCenter, gap: 7}}
                    onPress={() => editClick()}>
                    <EditShop />
                    <Text style={[styles.menuText]}>Edit</Text>
                  </TouchableOpacity>
                </MenuItem>
                <MenuItem
                 onPress={deleteClick}
                  style={{height: 'auto', paddingVertical: 5}}>
                  <TouchableOpacity style={{...flexCenter, gap: 7}} onPress={()=>deleteClick()}>
                    <DeleteShop />
                    <Text style={[styles.menuText]}>Delete</Text>
                  </TouchableOpacity>
                </MenuItem>
              </Menu>
              }
            </View>
          </View>
        </View>

        <View style={[styles.addressContainer]}>
          <View style={[styles.headerSecondaryMain]}>
            <Text style={[styles.ownerName]}>{data.owner_name}</Text>
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={() => favStoreAdded(data.uuid)}>
              <HeartIcon active={data?.favorites?.length || isFavScreen} />
            </TouchableOpacity>
          </View>
          <View style={[styles.detailsContainer]}>
            <CallIcon />
            <Text style={[styles.ownerDetailtext]}>{data.mobile}</Text>
          </View>
          <View style={[styles.detailsContainer]}>
            <LocationGray />
            <View>
              <Text style={[styles.ownerDetailtext, {maxWidth: '90%'}]}>
                {data.street},
              </Text>
              <Text style={[styles.ownerDetailtext]}>
                {data.town}, {data.city}- {data.pincode}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.updateDateContainer]}>
          <Text style={[styles.updateText]}>
            Updated on 
            {/* {data?.updated_at.split('T')[0]} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default StoreCard;

const styles = StyleSheet.create({
  mainCard: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: '3.5%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  leftBorder: {
    width: 12,
    backgroundColor: 'red',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  rowHeaderMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width:"95%"
  },
  shopName: {
    fontSize: isSmallDevice ? f16 : f18,
    color: '#222222',
    fontFamily: primaryFontSemiBold,
    paddingVertical: 4,
    width:"100%",

  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  verifiedText: {
    color: 'rgba(0, 185, 0, 1)',
    paddingRight: '2%',
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  ownerName: {
    color: '#222222',
    fontSize: f14,
    fontFamily: primaryFontMedium,
  },
  ownerDetailtext: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: f12,
    fontFamily: primaryFontRegular,
  },
  headerSecondaryMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  updateDateContainer: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  updateText: {
    textAlign: 'center',
    color: '#00000080',
    fontFamily: primaryFontLight,
    textAlign: 'center',
    paddingVertical: 5,
  },
  menuText: {
    color: defTextColor,
    fontFamily: primaryFontMedium,
    fontSize: f14,
  },
});
