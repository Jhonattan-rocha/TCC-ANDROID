import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { azulclaro, white, azulescuro } from '../config/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ModalLoad(props){
    return (
        <View>
            <Modal visible={props.View} style={styles.container}
                animationType="slide" transparent={true}>
                    <View style={styles.subcontainer}>
                        <TouchableOpacity style={styles.activity}>
                                <ActivityIndicator size={40} color="#000" collapsable={true}></ActivityIndicator>
                        </TouchableOpacity>
                    </View>
                </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    activity: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    subcontainer: {
        width: windowWidth,
        height: windowHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    iconModalClose: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: windowWidth
    },
    touchButtonOp: {
        width: windowWidth,
        backgroundColor: azulclaro,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20
    },
    textButtonOp: {
        color: white,
        fontSize: 18,
        fontWeight: 'bold'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
  }); 

