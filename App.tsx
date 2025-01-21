import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = (): React.JSX.Element => {

  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number>(0);

  const onCalculate = () => {
    if (input === '') {
      setResult(0);
      return;
    } else {

      try {
        let nums = input;
        let regex = /[\n,]/;
        if (input.startsWith('//')) {
          const parts = input.split('\n');
          regex = new RegExp(parts[0][2]);
          nums = parts[1];
        }

        const numbers = nums.split(regex);

        const negativeNums = numbers.filter((num) => parseInt(num) < 0);
        if (negativeNums.length > 0) {
          setResult(0)
          throw new Error(`negative number(s) not allowed: ${negativeNums.join(', ')}`);
        }

        const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0);
        setResult(sum);

      } catch (error: any) {
        Alert.alert(error?.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>String Calculator TDD</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter string of numbers"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={onCalculate} style={styles.calculateBtn}>
        <Text style={styles.calculateText}>
          Calculate
        </Text>
      </TouchableOpacity>
      {result !== null && <Text style={styles.sum}>Sum: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    width:'85%',
    alignSelf:'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 16,
    color:'black',
  },
  calculateBtn:{
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10,
    borderRadius:6,
    backgroundColor:'#027bff'
  },
  calculateText:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color:'white'
  },
  sum: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
