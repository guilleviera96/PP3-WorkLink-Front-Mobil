import React, { useState } from "react";
import Constants from 'expo-constants';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Linking } from "react-native";

const backgroundImage = require('./WorkLink-Background.png');

const Anchor = ({ url, children, style }) => {
    const handlePress = () => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={style}>{children}</Text>
        </TouchableOpacity>
    );
};

const Main = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const handleFormChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://104.237.3.197:5000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
        } catch (error) {
            console.error('Error al enviar los datos:', error.message);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Form formData={formData} onFormChange={handleFormChange} onRegister={handleRegister} />
            </View>
        </ImageBackground>
    );
};

const Form = ({ formData, onFormChange, onRegister }) => {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Únete a WorkLink</Text>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Sin caracteres especiales"
                placeholderTextColor="#475569"
                value={formData.username}
                onChangeText={(value) => onFormChange('username', value)}
            />
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                placeholder="email@example.abc*"
                placeholderTextColor="#475569"
                value={formData.email}
                onChangeText={(value) => onFormChange('email', value)}
                keyboardType="email-address"
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="8 caracteres - 1 caracter especial*"
                placeholderTextColor="#475569"
                value={formData.password}
                onChangeText={(value) => onFormChange('password', value)}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Repetir contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="8 caracteres - 1 caracter especial*"
                placeholderTextColor="#475569"
                value={formData.repeatPassword}
                onChangeText={(value) => onFormChange('repeatPassword', value)}
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Registrarse"
                    onPress={onRegister}
                    color="#334155"
                />
            </View>
            <Anchor url="#" style={styles.link}>
                Ya soy parte de Worklink
            </Anchor>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.8)', // Transparencia para el fondo
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#F8FAFC',
    },
    formContainer: {
        backgroundColor: '#1E293B',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        marginBottom: 20, // Espacio entre el formulario y el botón
    },
    input: {
        height: 40,
        backgroundColor: '#334155',
        borderColor: '#94A3B8',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color: '#94A3B8',
        borderRadius: 8,
    },
    buttonContainer: {
        marginTop: 20, // Agrega espacio entre los campos del formulario y el botón
        borderRadius: 8,
        overflow: 'hidden',
    },
    label: {
        color: '#94A3B8',
        marginBottom: 8, // Espacio entre la etiqueta y el campo de entrada
    },
    link: {
        color: '#94A3B8',
        marginTop: 20, // Espacio entre el botón y el enlace
        textAlign: 'center',
    },
});

export default Main;
