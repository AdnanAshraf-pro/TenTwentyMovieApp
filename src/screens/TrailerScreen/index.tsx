// screens/TrailerPlayerScreen.tsx
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

type TrailerPlayerRouteProp = RouteProp<
  { params: { trailerKey: string } },
  'params'
>;

const TrailerScreen = () => {
  const route = useRoute<TrailerPlayerRouteProp>();
  const { trailerKey } = route.params;
  const { goBack } = useNavigation();
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        ref={playerRef}
        height={300}
        play
        fullScreen
        videoId={trailerKey}
        onChangeState={state => {
          if (state === 'ended') {
            goBack();
          }
        }}
        onReady={() => {
          playerRef.current?.seekTo(0, true);
        }}
      />
      <Button title="Done" onPress={() => goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default TrailerScreen;
