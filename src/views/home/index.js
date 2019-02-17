import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";
import PropTypes from "prop-types";
import user1 from "../../../assets/images/user-cool.png";

import Icon from "react-native-vector-icons/FontAwesome";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const data = [
  {
    id: "1",
    name: "Harry",
    avatar: user1,
    time: "1 day ago",
    tweet: "hello world",
    liked: 2,
    comment: 2
  }
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Avatar
          containerStyle={{ marginRight: 20 }}
          rounded
          source={item.avatar}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.time}</Text>
        </View>
      </View>
      <Text>{item.tweet}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.cardBox}>
          <Icon color="#C0C0C0" name="heart" type="font-awesome" raise />
          <Text>{item.liked}</Text>
        </View>
        <View style={styles.cardBox}>
          <Icon color="#C0C0C0" name="retweet" type="font-awesome" raise />
          <Text>{item.liked}</Text>
        </View>
        <View style={styles.cardBox}>
          <Icon color="#C0C0C0" name="comment" type="font-awesome" raise />
          <Text>{item.liked}</Text>
        </View>
      </View>
    </View>
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8EAEE"
  },
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4,
    padding: 10,
    marginVertical: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardFooter: {
    position: "absolute",
    bottom: 0,
    left: 10,
    height: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  cardBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "10%"
  }
});

renderItem.propTypes = {
  item: PropTypes.object
};
