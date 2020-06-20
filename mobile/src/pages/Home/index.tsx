import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'

interface IBGEUF {
    sigla: string
}

interface IBGECity {
    nome: string
}

interface Item {
    label: string
    value: string
}

const Home = () => {

    const navigation = useNavigation();
    const [selectedCity, setSelectedCity] = useState('0');
    const [itemsCity, setItemsCity] = useState<Item[]>([]);
    const [itemsUf, setItemsUf] = useState<Item[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');

    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const items = response.data.map(uf => ({ label: uf.sigla, value: uf.sigla }))
            setItemsUf(items);
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const items = response.data.map(city => ({ label: city.nome, value: city.nome }));
            setItemsCity(items);
        })
    }, [selectedUf])

    function handleSelectedValueUF(uf: string) {
        console.log(uf);
        setSelectedUf(uf);
    }
    function handleSelectedValueCity(city: string) {

        setSelectedCity(city);
    }
    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf: selectedUf,
            city: selectedCity
        });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')}></Image>
                    <View>
                        <Text style={styles.title}>Seu Market place de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                    </View>
                </View>

                <RNPickerSelect
                    value={selectedUf}
                    onValueChange={(value) => handleSelectedValueUF(value)}
                    items={itemsUf}
                    style={{ ...pickerStyle }}
                    placeholder={{
                        label: 'Selecione um estado',
                        value: null,
                    }}>
                </RNPickerSelect>

                <RNPickerSelect
                    value={selectedCity}
                    onValueChange={(value) => handleSelectedValueCity(value)}
                    items={itemsCity}
                    style={{ ...pickerStyle }}
                    placeholder={{
                        label: 'Selecione uma cidade',
                        value: null,
                    }}>
                </RNPickerSelect>


                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#fff" size={24}></Icon>
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: '#f0f0f5'
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,

    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

const pickerStyle = StyleSheet.create({
    inputIOS: styles.input
})


export default Home;
