import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ListRenderItem,
} from 'react-native';
import GlobalStyles from '../../utils/globalStyles';
import useHome from './useHome';
import MovieGrid from '../../components/MovieCard';
import { Movie } from '../../utils/types';
import CustomHeader from '../../components/AppHeader';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

const HomeScreen = () => {
  const { getMoviesList, moviesList, page, hasMore, isLoading } = useHome();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleOnMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetail', { data: movie.id });
  };

  const renderItem: ListRenderItem<Movie> = ({ item, index }) => (
    <MovieGrid movie={item} onMoviePress={handleOnMoviePress} key={index} />
  );

  return (
    <View style={GlobalStyles.mainWrapper}>
      <CustomHeader
        title="My Movies"
        right
        rightComponent={
          <Ionicons
            name="search-outline"
            size={18}
            color={'#fff'}
            onPress={() => navigation.navigate('SearchMovie')}
          />
        }
      />

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      <FlatList
        contentContainerStyle={styles.listContent}
        data={moviesList}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!isLoading && hasMore) {
            getMoviesList(page + 1);
          }
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loader: {
    marginVertical: 16,
  },
  searchLink: {
    fontSize: 16,
    color: 'blue',
    marginVertical: 12,
  },
});
