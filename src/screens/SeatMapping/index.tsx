import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import CustomHeader from '../../components/AppHeader';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Seat {
  id: string;
  isBooked: boolean;
}

const NUM_ROWS = 5;
const NUM_COLUMNS = 6;

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLUMNS; col++) {
      seats.push({
        id: `${String.fromCharCode(65 + row)}${col + 1}`,
        isBooked: Math.random() < 0.2,
      });
    }
  }
  return seats;
};

const index = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [seats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prev =>
      prev.includes(seat.id)
        ? prev.filter(id => id !== seat.id)
        : [...prev, seat.id],
    );
  };

  const renderSeat = ({ item, index }: { item: Seat; index: number }) => {
    const isSelected = selectedSeats.includes(item.id);
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.seat,
          item.isBooked
            ? styles.bookedSeat
            : isSelected
            ? styles.selectedSeat
            : styles.availableSeat,
        ]}
        onPress={() => toggleSeat(item)}
        disabled={item.isBooked}
      >
        <Text style={styles.seatText}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Select Your Seats"
        left
        leftComponent={
          <Ionicons
            name="arrow-back-outline"
            size={18}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <FlatList
        data={seats}
        keyExtractor={item => item.id}
        renderItem={renderSeat}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.grid}
        scrollEnabled={false}
      />

      <View style={styles.legend}>
        <View style={[styles.legendItem, styles.availableSeat]} />
        <Text style={styles.legendLabel}>Available</Text>
        <View style={[styles.legendItem, styles.selectedSeat]} />
        <Text style={styles.legendLabel}>Selected</Text>
        <View style={[styles.legendItem, styles.bookedSeat]} />
        <Text style={styles.legendLabel}>Booked</Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  availableSeat: {
    backgroundColor: '#4CAF50',
  },
  selectedSeat: {
    backgroundColor: '#2196F3',
  },
  bookedSeat: {
    backgroundColor: '#9E9E9E',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    width: 20,
    height: 20,
    marginHorizontal: 6,
    marginVertical: 4,
    borderRadius: 4,
  },
  legendLabel: {
    marginRight: 16,
    fontSize: 14,
  },
});
