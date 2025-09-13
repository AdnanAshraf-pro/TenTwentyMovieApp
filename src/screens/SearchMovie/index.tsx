import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import CustomHeader from '../../components/AppHeader';
import GlobalStyles from '../../utils/globalStyles';
import useHome from '../Home/useHome';
import useMovieSearch from './useSearch';
import { Movie } from '../../utils/types';
import MovieGrid from '../../components/MovieCard';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();
  const { moviesList } = useHome();
  const localCachedMovies = moviesList as Movie[];

  const { searchMovies } = useMovieSearch({ localCachedMovies });

  const handleSearchMovie = async (): Promise<void> => {
    if (!query) return;

    setLoading(true);
    setHasSearched(false);

    try {
      const listOfSearchedMovie = await searchMovies(query);
      setMovies(listOfSearchedMovie);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleOnMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { data: movie.id });
  };

  const renderItem: ListRenderItem<Movie> = ({ item }) => (
    <MovieGrid movie={item} onMoviePress={handleOnMoviePress} />
  );

  return (
    <View style={GlobalStyles.mainWrapper}>
      <CustomHeader title="Search Movie" />

      <TextInput
        style={styles.input}
        placeholder="Enter movie name..."
        value={query}
        onChangeText={setQuery}
      />

      <Button title="Search" onPress={handleSearchMovie} disabled={!query} />

      {loading && <ActivityIndicator size="large" style={styles.loading} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={movies}
        keyExtractor={item => item.imdbID}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading && query && hasSearched ? (
            <Text>No movies found.</Text>
          ) : null
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
    margin:10
  },
  loading: { marginVertical: 20 },
  error: { color: 'red', marginVertical: 10 },
  list: { marginTop: 10 },
});
