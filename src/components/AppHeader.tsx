// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  left?: boolean;
  right?: boolean;
  leftComponent?: boolean;
  rightComponent?: boolean;
}

const CustomHeader = ({
  title,
  left,
  right,
  leftComponent,
  rightComponent,
}: Props) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sideWrapper}>{left && leftComponent}</View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.sideWrapper}>{right && rightComponent}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1c1c1c',
  },
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideWrapper: {
    width: '30%',
    backgroundColor: '#fff',
  },
});

export default CustomHeader;
