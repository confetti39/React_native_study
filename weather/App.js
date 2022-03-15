import { View, Dimensions, StyleSheet, Text, ScrollView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const SCREEN_WIDTH = Dimensions.get('window').width; 윗 코드와 같은 의미임
console.log(SCREEN_WIDTH); // 작동하는 휴대폰의 스크린 사이즈를 알 수 있음 height, width

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal // Scroll 방향을 수평방향으로 지정함
        pagingEnabled // ScrollView로 보여주는 Item이 독립된 페이지를 가지게 함
        showsHorizontalScrollIndicator={false} // 스크롤할 때 하단 바가 보이지 않게 함
        contentContainerStyle={styles.weather} // ScrollView는 style이 아니라 contentContainerStyle로 style 지정해 주어야 함
      // 이런 props는 reactnative.dev에 component props에서 찾으면 됨
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    // flex: 3,
  },
  day: {
    // flex: 1,
    // justifyContent: "center",
    width: SCREEN_WIDTH, // day style의 너비를 휴대폰 스크린의 너비와 같게 하여 기온과 날씨를 하나씩만 보일 수 있게 함.
    alignItems: "center",
    // backgroundColor: "teal",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,

  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },

});