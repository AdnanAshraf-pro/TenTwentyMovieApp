import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import GlobalStyles from '../../utils/globalStyles';
import useHome from './useHome';
import MovieGrid from '../../components/MovieCard';
import useMovieDetail from '../MovieDetail/useMovieDetail';
import { Movie } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/AppHeader';
type Props = {};

const index = (props: Props) => {
  const { getMoviesList, moviesList, page, hasMore, isLoading } = useHome();
  const { navigate } = useNavigation();

  const handleOnMoviePress = (movie: Movie) => {
    navigate('MovieDetail', { data: movie?.id });
  };

  return (
    <View style={GlobalStyles.mainWrapper}>
      <CustomHeader title="My Movies" />
      <Text onPress={()=>navigate('SearchMovie')}>Seach mobie</Text>
      {isLoading && <ActivityIndicator />}
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!isLoading && hasMore) {
            getMoviesList(page + 1);
          }
        }}
        data={moviesList}
        renderItem={({ item, index }) => (
          <MovieGrid
            key={index}
            movie={item}
            onMoviePress={handleOnMoviePress}
          />
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
