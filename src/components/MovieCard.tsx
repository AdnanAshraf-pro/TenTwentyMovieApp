import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Movie } from '../utils/types';

const screenWidth = Dimensions.get('window').width;

interface MovieGridProps {
  movie: Movie;
  onMoviePress: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movie, onMoviePress }) => {
  return (
    <TouchableOpacity onPress={() => onMoviePress(movie)} style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginHorizontal:5,
    marginVertical:10,
    backgroundColor:'#fff',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  poster: {
    width: '100%',
    height: screenWidth * 0.6,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: '800',
  },
});

export default MovieGrid;
