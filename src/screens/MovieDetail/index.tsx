import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';
import { MovieDetail } from '../../utils/types';
import useMovieDetail from './useMovieDetail';
import useMovieTrailer from '../TrailerScreen/useTrailer';
import CustomHeader from '../../components/AppHeader';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const screenWidth = Dimensions.get('window').width;

const index = () => {
  const { params } = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();

  const { isMovieDetailLoading, movieDetail } = useMovieDetail(params?.data);
  const { trailerKey, isLoading } = useMovieTrailer(params?.data);

  const movie = movieDetail as MovieDetail;
  console.log('movie', movie);
  return (
    <>
      <CustomHeader
        title="Details"
        left
        leftComponent={
          <Ionicons
            name="arrow-back-outline"
            size={18}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
        }
        right
        rightComponent={
          <MaterialDesignIcons
            name="seat"
            size={18}
            color={'#fff'}
            onPress={() => navigation.navigate('SeatMapping')}
          />
        }
      />

      <ScrollView style={styles.container}>
        {isMovieDetailLoading && (
          <ActivityIndicator size="large" color={'red'} style={{ flex: 1 }} />
        )}
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
          }}
          style={styles.backdrop}
        />
        <View style={styles.content}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w342${movie?.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.tagline}>{movie?.tagline}</Text>
          <View style={styles.trailerButtonWrapper}>
            <TouchableOpacity
              disabled={isLoading}
              onPress={() =>
                navigation.navigate('TrailerPlayer', { trailerKey })
              }
            >
              <Text style={styles.section}>Show Trailer</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.section}>Overview</Text>
          <Text style={styles.text}>{movie?.overview}</Text>

          <Text style={styles.section}>Genres</Text>
          <Text style={styles.text}>
            {movie?.genres.map(g => g.name).join(', ')}
          </Text>

          <Text style={styles.section}>Release Date</Text>
          <Text style={styles.text}>{movie?.release_date}</Text>

          <Text style={styles.section}>Run time</Text>
          <Text style={styles.text}>{movie?.runtime} min</Text>

          <Text style={styles.section}>Language</Text>
          <Text style={styles.text}>
            {movie?.spoken_languages.map(l => l.name || l.iso_639_1).join(', ')}
          </Text>

          <Text style={styles.section}>Budget</Text>
          <Text style={styles.text}>${movie?.budget.toLocaleString()}</Text>

          <Text style={styles.section}>Revenue</Text>
          <Text style={styles.text}>${movie?.revenue.toLocaleString()}</Text>

          <Text style={styles.section}>Vote Average</Text>
          <Text style={styles.text}>
            {movie?.vote_average} / 10 ({movie?.vote_count} votes)
          </Text>

          {movie?.homepage ? (
            <>
              <Text style={styles.section}>Homepage</Text>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(movie?.homepage)}
              >
                {movie?.homepage}
              </Text>
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdrop: {
    width: screenWidth,
    height: screenWidth * 0.55,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
    marginBottom: 12,
  },
  section: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  link: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 4,
  },
  trailerButtonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
});
