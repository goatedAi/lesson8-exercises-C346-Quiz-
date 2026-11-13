
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Modal, Platform } from 'react-native';

// Pick an emoji, heading and message to match the score
function getResultInfo(score) {
  if (score === 5) {
    return { emoji: '🏆', heading: 'Perfect score!', message: "You're a true car expert." };
  }
  if (score >= 3) {
    return { emoji: '🎉', heading: 'Great job!', message: 'You really know your cars.' };
  }
  if (score >= 1) {
    return { emoji: '👍', heading: 'Not bad!', message: 'Keep practising and give it another go.' };
  }
  return { emoji: '😅', heading: 'Better luck next time!', message: 'Have another look at the cars and try again.' };
}

export default function App() {

  // Store the user's answers
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [answer5, setAnswer5] = useState('');

  // Results popup
  const [finalScore, setFinalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const resultInfo = getResultInfo(finalScore);

  // Lets "Try Again" scroll back to the top
  const scrollRef = useRef(null);

  // Check the answers and calculate the score
  function checkAnswers() {
    let score = 0;
    if (answer1 === 'lamborghini') {
      score = score + 1;
    }
    if (answer2 === 'ford') {
      score = score + 1;
    }
    if (answer3.trim().toLowerCase() === 'honda') {
      score = score + 1;
    }
    if (answer4 === 'mercedes') {
      score = score + 1;
    }
    if (answer5.trim().toLowerCase() === 'nissan') {
      score = score + 1;
    }
    // Show the results popup
    setFinalScore(score);
    setShowResults(true);
  }

  // Clear all answers so the quiz can be taken again
  function restartQuiz() {
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setAnswer4('');
    setAnswer5('');
    setShowResults(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.content}>

        {/* App Title */}
        <View style={styles.header}>
          <Text style={styles.title}>🏎️ Car Quiz!</Text>
          <Text style={styles.subtitle}>Test your knowledge of cars!</Text>
          <View style={styles.headerTag}>
            <Text style={styles.headerTagText}>5 QUESTIONS</Text>
          </View>
        </View>

        {/* First question */}
        <View style={styles.questionCard}>
          <View style={styles.imageFrame}>
            <Image source={require("./img/lambo.jpg")} style={styles.carImage} resizeMode="cover" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.questionNumber}>QUESTION 1 OF 5</Text>
            <Text style={styles.question}>What kind of car is this?</Text>
            <View style={styles.pickerWrapper}>
              <Picker style={styles.picker} selectedValue={answer1} onValueChange={(value) => setAnswer1(value)}>
                <Picker.Item label="Select an answer..." value="" color="#8A94A6" />
                <Picker.Item label="Toyota" value="toyota" />
                <Picker.Item label="Lamborghini" value="lamborghini" />
                <Picker.Item label="Tesla" value="tesla" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Second question */}
        <View style={styles.questionCard}>
          <View style={styles.imageFrame}>
            <Image source={require("./img/ford.jpg")} style={styles.carImage} resizeMode="cover" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.questionNumber}>QUESTION 2 OF 5</Text>
            <Text style={styles.question}>What kind of car is this?</Text>
            <View style={styles.pickerWrapper}>
              <Picker style={styles.picker} selectedValue={answer2} onValueChange={(value) => setAnswer2(value)}>
                <Picker.Item label="Select an answer..." value="" color="#8A94A6" />
                <Picker.Item label="Nissan" value="nissan" />
                <Picker.Item label="Honda" value="honda" />
                <Picker.Item label="Ford" value="ford" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Third question */}
        <View style={styles.questionCard}>
          <View style={styles.imageFrame}>
            <Image source={require("./img/honda.jpg")} style={styles.carImage} resizeMode="cover" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.questionNumber}>QUESTION 3 OF 5</Text>
            <Text style={styles.question}>What kind of car is this?</Text>
            <TextInput style={styles.input} placeholder="Type your answer" placeholderTextColor="#8A94A6" value={answer3} onChangeText={(text) => setAnswer3(text)} />
          </View>
        </View>

        {/* Fourth question */}
        <View style={styles.questionCard}>
          <View style={styles.imageFrame}>
            <Image source={require("./img/mercs.jpg")} style={styles.carImage} resizeMode="cover" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.questionNumber}>QUESTION 4 OF 5</Text>
            <Text style={styles.question}>What kind of car is this?</Text>
            <View style={styles.pickerWrapper}>
              <Picker style={styles.picker} selectedValue={answer4} onValueChange={(value) => setAnswer4(value)}>
                <Picker.Item label="Select an answer..." value="" color="#8A94A6" />
                <Picker.Item label="Honda" value="honda" />
                <Picker.Item label="Kia" value="kia" />
                <Picker.Item label="Mercedes" value="mercedes" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Fifth question */}
        <View style={styles.questionCard}>
          <View style={styles.imageFrame}>
            <Image source={require("./img/nissan.jpg")} style={styles.carImage} resizeMode="cover" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.questionNumber}>QUESTION 5 OF 5</Text>
            <Text style={styles.question}>What kind of car is this?</Text>
            <TextInput style={styles.input} placeholder="Type your answer" placeholderTextColor="#8A94A6" value={answer5} onChangeText={(text) => setAnswer5(text)} />
          </View>
        </View>

        {/* Submit button */}
        <Pressable
          onPress={checkAnswers}
          accessibilityRole="button"
          style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
        >
          <Text style={styles.submitButtonText}>Submit Quiz</Text>
        </Pressable>

      </View>

      {/* Results popup */}
      <Modal visible={showResults} transparent={true} animationType="fade" onRequestClose={() => setShowResults(false)}>
        <View style={styles.overlay}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>{resultInfo.emoji}</Text>
            <Text style={styles.resultHeading}>{resultInfo.heading}</Text>

            <Text style={styles.resultScore}>
              {finalScore}<Text style={styles.resultScoreTotal}> / 5</Text>
            </Text>
            <Text style={styles.resultLabel}>questions correct</Text>

            {/* Score bar: one block per point scored */}
            <View style={styles.scoreBar}>
              {[1, 2, 3, 4, 5].map((n) => (
                <View key={n} style={[styles.scoreBlock, n <= finalScore && styles.scoreBlockFilled]} />
              ))}
            </View>

            <Text style={styles.resultMessage}>{resultInfo.message}</Text>

            <View style={styles.resultButtons}>
              <Pressable
                onPress={restartQuiz}
                accessibilityRole="button"
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
              >
                <Text style={styles.secondaryButtonText}>Try Again</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowResults(false)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.primaryButton, pressed && styles.submitButtonPressed]}
              >
                <Text style={styles.primaryButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar hidden={true} />
    </ScrollView>
  );
}

// App Styling
const styles = StyleSheet.create({

  screen: {
    backgroundColor: '#F2F4F8',
  },

  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  // Keeps the quiz a phone-like width when opened on a laptop browser
  content: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },

  header: {
    backgroundColor: '#1D3557',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    boxShadow: '0px 6px 16px rgba(29, 53, 87, 0.25)',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },

  subtitle: {
    fontSize: 16,
    color: '#A8DADC',
    marginTop: 6,
  },

  headerTag: {
    marginTop: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },

  headerTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(29, 53, 87, 0.08)',
  },

  // The frame sets the photo's shape; the photo just fills it
  imageFrame: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },

  carImage: {
    width: '100%',
    height: '100%',
  },

  cardBody: {
    padding: 16,
  },

  questionNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E63946',
    letterSpacing: 1,
  },

  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 4,
  },

  pickerWrapper: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D6DCE5',
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },

  // On web the Picker is a plain <select>, so remove its own border
  // and let the wrapper above provide the look
  picker: Platform.select({
    web: {
      borderWidth: 0,
      backgroundColor: 'transparent',
      padding: 12,
      fontSize: 16,
      color: '#1D3557',
    },
    default: {},
  }),

  input: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#D6DCE5',
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    padding: 12,
    fontSize: 16,
    color: '#1D3557',
  },

  submitButton: {
    marginTop: 8,
    backgroundColor: '#E63946',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(230, 57, 70, 0.3)',
  },

  submitButtonPressed: {
    backgroundColor: '#C92D3A',
  },

  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Results popup
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(29, 53, 87, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  resultCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.25)',
  },

  resultEmoji: {
    fontSize: 56,
  },

  resultHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 8,
    textAlign: 'center',
  },

  resultScore: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 16,
  },

  resultScoreTotal: {
    fontSize: 28,
    color: '#8A94A6',
  },

  resultLabel: {
    fontSize: 14,
    color: '#777777',
  },

  scoreBar: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    marginTop: 16,
  },

  scoreBlock: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E4E8EE',
  },

  scoreBlockFilled: {
    backgroundColor: '#E63946',
  },

  resultMessage: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginTop: 16,
  },

  resultButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 24,
  },

  secondaryButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1D3557',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  secondaryButtonPressed: {
    backgroundColor: '#EEF1F6',
  },

  secondaryButtonText: {
    color: '#1D3557',
    fontSize: 16,
    fontWeight: 'bold',
  },

  primaryButton: {
    flex: 1,
    backgroundColor: '#E63946',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
