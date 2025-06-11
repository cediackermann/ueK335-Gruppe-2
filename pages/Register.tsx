import React, { useState } from 'react';
import {Image,StyleSheet,View,TouchableOpacity,Platform,ImageSourcePropType,Alert,} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

const logoImage: ImageSourcePropType = require('../assets/logo.png');

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [birthdateText, setBirthdateText] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const showDatePicker = (): void => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date | undefined): void => {
    hideDatePicker();
    if (selectedDate) {
      setBirthdate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setBirthdateText(`${month}/${day}/${year}`);
    }
  };

  const handleSignUp = (): void => {
    console.log('Sign Up pressed:', { firstname, lastname, birthdate: birthdateText, email, password });
    Alert.alert('Sign Up', 'Sign Up logic not implemented yet.');
  };

  const navigateToLogin = (): void => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error("Navigation error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title} variant="headlineLarge">
        Sign Up
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Firstname"
          value={firstname}
          onChangeText={setFirstname}
          mode="outlined"
          style={styles.input}
          placeholder="John"
          theme={{ roundness: 8 }}
        />
        <TextInput
          label="Lastname"
          value={lastname}
          onChangeText={setLastname}
          mode="outlined"
          style={styles.input}
          placeholder="Doe"
          theme={{ roundness: 8 }}
        />

        <TouchableOpacity onPress={showDatePicker}>
          <View pointerEvents="none">
            <TextInput
              label="Birthdate"
              value={birthdateText}
              mode="outlined"
              style={styles.input}
              editable={false}
              placeholder="05/06/2025"
              right={<TextInput.Icon icon="calendar" />}
              theme={{ roundness: 8 }}
            />
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          date={birthdate}
        />

        <TextInput
          label="E-mail *"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="email@example.com"
          theme={{ roundness: 8 }}
        />
        <TextInput
          label="Password *"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          placeholder="************"
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          theme={{ roundness: 8 }}
        />
      </View>

      <Text style={styles.alreadyHaveAccountText}>
        Already have a{' '}
        <Text
          style={styles.loginLink}
          onPress={navigateToLogin}
          >
          login?
        </Text>
      </Text>

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.signUpButton}
        labelStyle={styles.signUpButtonText}
        contentStyle={styles.signUpButtonContent}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 60,
    marginBottom: 30,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: 'bold',
    color: '#0A2543',
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 340,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  alreadyHaveAccountText: {
    marginTop: 15,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#0A2543',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#0A2543',
    borderRadius: 8,
    marginTop: 25,
    width: '100%',
    maxWidth: 340,
  },
  signUpButtonContent: {
    paddingVertical: 6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;