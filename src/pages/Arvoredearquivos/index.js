import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, NativeModules, StyleSheet, Modal, Button, TouchableWithoutFeedback, Vibration } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import * as types from './types';
import { useNavigation } from '@react-navigation/native';

export default function Tree(){
    const [paths, setPaths] = React.useState([]);
    const [main, setMain] = React.useState({});
    const [ops, setOps] = React.useState(false);
    const [filesAwait, setFilesAwait] = React.useState([]);
    const [func, setFunc] = React.useState([]);
    const [showMakeDir, setShowMakeDir] = React.useState(false);
    const [folder, setFolder] = React.useState("");
    const navigate = useNavigation();

    function removerObjetoDoArray(array, objetoParaRemover) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === objetoParaRemover) {
                array.splice(i, 1); // Remove 1 elemento a partir do índice i
                break; // Encerra o loop após encontrar o objeto
            }
        }

        setFilesAwait(array)
    }

    const handleLongPress = (item) => {
        let file = filesAwait.find(file => file.path === item.path) ?? {};

        if(Object.keys(file).length === 0){
            let ar = [...filesAwait]
            ar.push(item)
            setFilesAwait(ar)
        }else{
            removerObjetoDoArray(filesAwait, file)
        }

        UpdatePaths(main);
        Vibration.vibrate(100);
    };

    const UpdatePaths = async (item) => {
        const { FileToolsModule } = NativeModules;
        if(item.mimetype){
            FileToolsModule.openFile(item.path, item.mimetype);
        }else{
            setMain(item)
            FileToolsModule.listFiles(item.path)
            .then(response => {
                setPaths(response)
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    const PreviousPath = () => {
        let path = {...main};
        let array = String(path.path).split("/");
        array.pop();
        path.path = array.join("/");
        setMain(path);
        UpdatePaths(path);
        // arrumar o erro aqui, quando tento voltar, ele não volta, e adicona os caminhos aos arquivos selecionados
    }

    const handleExecFunc = () => {
        const { FileToolsModule } = NativeModules;
        const paths = [];
        const mime = [];
        filesAwait.forEach(file => {
            switch(func[0].func){
                case types.copy: {
                    console.log(file)
                    FileToolsModule.copyFile(file.path, main.path + "/" + file.name, false)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                    break;
                }
                case types.move: {
                    FileToolsModule.copyFile(file.path, main.path + "/" + file.name, true)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                    break;
                }
                case types.del: {
                    FileToolsModule.delete(file.path)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                    break;
                }

                case types.share: {
                    paths.push(file.path);
                    mime.push(file.mimetype);
                    console.log(file);
                    break;
                }
            }
        });

        if(paths.length > 0 && mime.length > 0){
            handleShare(paths, mime, " \x00 ");
        }

        setFilesAwait([]);
        setFunc([]);
        UpdatePaths(main);
    }

    const handleShare = (path, mimetype, texto) => {
        try {
          const { FileToolsModule } = NativeModules;
          FileToolsModule.shareFiles(path, mimetype, texto)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
        } catch (error) {
          console.log('Erro ao compartilhar o texto:', error);
        }
    };

    React.useEffect(() => {
        setMain({path: "/storage/emulated/0/"})
        UpdatePaths({path: "/storage/emulated/0/"})
    }, [])

    React.useEffect(() => { 
        navigate.setOptions({
            headerRight: props => (
                <View {...props}>
                     <TouchableOpacity onPress={() => setOps(!ops)}>
                        <IconEnt  name="dots-three-horizontal" size={20} color="#000"></IconEnt>
                     </TouchableOpacity>                    
                        {ops ? 
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={ops}
                                onRequestClose={() => setOps(false)}
                            >
                                <TouchableOpacity style={style.modalContainer} onPress={() => setOps(false)}>
                                    <View style={[style.modalContent]}>
                                        <TouchableOpacity
                                        style={style.option}
                                        onPress={() => {
                                            setFunc([{name: 'Deletar', func: types.del}]);
                                            setOps(false)
                                        }}
                                        >
                                        <Text style={{color: "black"}}>Deletar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        style={style.option}
                                        onPress={() => {
                                            setFunc([{name: 'Mover', func: types.move}]);
                                            setOps(false)
                                        }}
                                        >
                                        <Text style={{color: "black"}}>Mover</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        style={style.option}
                                        onPress={() => {
                                            setFunc([{name: 'Copiar', func: types.copy}]);
                                            setOps(false)
                                        }}
                                        >
                                        <Text style={{color: "black"}}>Copiar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        style={style.option}
                                        onPress={() => {
                                            setFunc([{name: 'Compartilhar', func: types.share}]);
                                            setOps(false)
                                        }}
                                        >
                                        <Text style={{color: "black"}}>Compartilhar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                        style={style.option}
                                        onPress={() => {
                                            setShowMakeDir(true);
                                            setOps(false);
                                        }}
                                        >
                                        <Text style={{color: "black"}}>Criar Pasta</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                            :
                            null
                        }
                </View>
            )
        })
    }, [navigate, ops, setOps]);



    return (
            <SafeAreaView>
                <Text style={style.title}>{ "/" + String(main.path).split("/").join(" -> ")}</Text>
                {func.length === 1 ? 
                    <View style={style.opsFunctions}>
                        <Text style={{color: 'black'}}>{func[0].name} ?</Text>
                        <View style={style.buttonFunc}>
                            <TouchableOpacity style={{borderRadius: 10, borderWidth: 1, borderColor: 'gray', padding: 5, width: 100, display: 'flex', justifyContent: 'center'}}
                            onPress={() => {
                                handleExecFunc();
                            }}
                            >
                                <Text style={{color: 'black'}}>{func[0].name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFunc([])}>
                                <IconAnt name="close" color="#000" size={25}></IconAnt>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }
                {filesAwait.length > 0 ? 
                    <View style={{display: "flex", alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: "black", textAlign: 'center', fontSize: 14}}>Selecionados: {filesAwait.length} </Text>
                        <IconAnt name="close" color="#000" size={30} onPress={() => setFilesAwait([])}></IconAnt>
                    </View>
                :null}
                <View style={{width: 40}}>
                    <IconAnt name="arrowleft" color="#000" size={30} onPress={() => PreviousPath()}></IconAnt>
                </View>
                <FlatList
                data={paths}
                keyExtractor={(item, index) => index}
                initialNumToRender={5} // Número inicial de elementos a serem renderizados
                windowSize={5}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            UpdatePaths(item)
                        }} 
                        style={style.item}
                        onLongPress={() => handleLongPress(item)}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                {!item.mimetype ? 
                                <IconAnt name="folderopen" color="#000" size={25}></IconAnt>
                                :
                                <IconAnt name="file1" color="#000" size={25}></IconAnt>}
                                <Text style={{color: "black"}}> {String(item.name).replace("/", "")}</Text>
                            </View>
                            {filesAwait.find(file => file.path === item.path) ? <IconAnt name="check" color="#000" size={20}></IconAnt>: null}
                        </TouchableOpacity>
                    )
                }}
                numColumns={1}
                ></FlatList>
                {showMakeDir ? 
                    <Modal visible={showMakeDir} transparent={true} animationType="fade">
                    <TouchableWithoutFeedback onPress={() => {
                        setShowMakeDir(false)
                    }}>
                        <View style={style.overlay} />
                    </TouchableWithoutFeedback>
                    <View style={style.containerMes}>
                        <TextInput
                        style={style.inputMakeDir} 
                        value={folder}
                        autoFocus={true}
                        numberOfLines={3}
                        multiline
                        onChangeText={(txt) => setFolder(txt)}
                        />
                        <Button title='Criar' onPress={() => {
                            const { FileToolsModule } = NativeModules
                            FileToolsModule.mkDir(main.path + "/" + folder)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                            setShowMakeDir(false)
                            UpdatePaths(main);
                        }}></Button>
                    </View>
                    </Modal>:
                    null}
            </SafeAreaView>
    );
}

const style = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderRadius: 10
    },
    title: {
        color: "black",
        fontSize: 15,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 10
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        position: 'absolute'
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    opsFunctions: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: "column",
        justifyContent: 'flex-start'
    },
    buttonFunc: {
        display: 'flex',
        alignContent: 'center',
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    overlay: {
        flex: 1,
    },
    containerMes: {
        backgroundColor: '#fff',
        padding: 16,
        margin: 32,
        borderRadius: 8,
        maxHeight: 250,
        height: 150
    },
    inputMakeDir: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        color: 'black',
        flexWrap: 'wrap',
        minHeight: 50,
        maxHeight: 200
    },
});
