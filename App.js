import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [answerValue, setAnswerValue] = useState('0');
  const [memoryValue, setMemoryValue] = useState(null);
  const [operatorValue, setOperatorValue] = useState(null);
  const [displayValue, setDisplayValue] = useState('0');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);

    switch (operatorValue) {
      case '+':
        return previous + current;
      case '-':
        return previous - current;
      case 'x':
        return previous * current;
      case '÷':
        return previous / current;
    }
  };

  const buttonPressed = (value) => {
    if (!isNaN(value)) {
      if (isNewNumber || answerValue === "0") {
        setAnswerValue(value.toString());
        setDisplayValue(displayValue === "0" ? value.toString() : displayValue + value.toString());
        setIsNewNumber(false);
      } else {
        setAnswerValue(answerValue + value);
        setDisplayValue(displayValue + value);
      }
    } else {
      switch (value) {
        case "AC":
          setAnswerValue("0");
          setMemoryValue("0");
          setOperatorValue("0");
          setDisplayValue("0");
          setIsNewNumber(true);
          break;
        case "+":
        case "-":
        case "x":
        case "÷":
          setOperatorValue(value);
          setMemoryValue(answerValue);
          setIsNewNumber(true);
          setDisplayValue(displayValue + " " + value + " ");
          break;
        case "=":
          const previous = parseFloat(memoryValue);
          const current = parseFloat(answerValue);
          switch (operatorValue) {
            case "+":
              setAnswerValue((previous + current).toString());
              setDisplayValue(displayValue + " = " + (previous + current).toString());
              break;
            case "-":
              setAnswerValue((previous - current).toString());
              setDisplayValue(displayValue + " = " + (previous - current).toString());
              break;
            case "x":
              setAnswerValue((previous * current).toString());
              setDisplayValue(displayValue + " = " + (previous * current).toString());
              break;
            case "÷":
              setAnswerValue((previous / current).toString());
              setDisplayValue(displayValue + " = " + (previous / current).toString());
              break;
            default:
              break;
          }
          setMemoryValue("0");
          setIsNewNumber(true);
          break;
        case "+/-":
          const negatedValue = parseFloat(answerValue) * -1;
          setAnswerValue(negatedValue.toString());
          break;
        case "%":
          const percentageValue = parseFloat(answerValue) / 100;
          setAnswerValue(percentageValue.toString());
          break;
        default:
          break;
      }
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue || answerValue}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed('AC')}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed('+/-')}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRow1, styles.buttonBlue]} onPress={() => buttonPressed('÷')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>÷</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('7')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('8')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('9')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => buttonPressed('x')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('4')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('5')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('6')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => buttonPressed('-')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('1')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('2')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('3')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => buttonPressed('+')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.buttonZero]} onPress={() => buttonPressed('0')}>
          <Text style={[styles.buttonText, styles.buttonTextZero]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonPressed('.')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={() => buttonPressed('=')}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  displayText:
 {
    fontSize: 64,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#454545',
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },
  buttonRow1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9A9A9',
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },
  buttonBlue: {
    backgroundColor: '#2B65EC',
  },
  buttonText: {
    fontSize: 32,
    color: '#000',
  },
  buttonTextSecondary: {
    color: '#888',
  },
  buttonTextWhite: {
    color: '#fff',
  },
  buttonZero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'left'
  },
  buttonTextZero: {
    textAlign: 'left',
    color: '#fff',
    paddingLeft: 40
  },
});
