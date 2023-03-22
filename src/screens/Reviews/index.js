import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
import {createReview, getReviews} from '../../services/notesService';
import Input from '../../components/Input';
import Spacing from '../../components/Spacing';
import BackButton from '../../components/BackButton';
import NumericInput from 'react-native-numeric-input';
import styled from 'styled-components';
import {Text} from 'react-native-elements';
import ErrorText from '../../components/ErrorText';
import Toast from 'react-native-toast-message';

const Reviews = ({navigation, route}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [creatingReview, setCreatingReview] = useState(false);

  const handleEditNote = async () => {
    setError('');

    if (!comment) {
      setError('Le commentaire est obligatoire');
      return;
    }

    if (!rating) {
      setError('La note est obligatoire');
      return;
    }

    setCreatingReview(true);

    try {
      await createReview(comment, rating);
      setComment('');
      setRating(0);
      getAllReviews();
      Toast.show({
        type: 'success',
        text1: 'Avis créé',
        text2: "L'avis a bien été créé",
        position: 'bottom',
      });
      setCreatingReview(false);
    } catch (err) {
      console.error(err);
      setCreatingReview(false);
      Toast.show({
        type: 'error',
        text1: "Erreur lors de la création de l'avis",
        text2: "Une erreur est survenue lors de l'avis",
        position: 'bottom',
      });
      setCreatingReview(false);
    }
  };

  const getAllReviews = async () => {
    const allReviews = await getReviews();
    setReviews(allReviews);
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <>
      <BackButton>Revenir à la liste des notes</BackButton>
      <Spacing size={16} />
      <Input
        width="100%"
        name="Commentaire"
        value={comment}
        mandatory={true}
        maxLength={255}
        onChange={setComment}
      />
      <Spacing size={8} />
      <Text>
        Note
        <Mandatory>*</Mandatory>
      </Text>
      <NumericInput
        minValue={1}
        value={rating}
        rounded={true}
        upDownButtonsBackgroundColor="#000"
        maxValue={5}
        onChange={value => setRating(value)}
      />
      <ErrorText>{error}</ErrorText>
      <Spacing size={4} />
      <Button
        onPress={handleEditNote}
        loading={creatingReview}
        width={120}
        title={'Ajouter un avis'}
      />

      <ReviewsList>
        {reviews.map(review => (
          <Review key={review.id}>
            <Comment>{review.comment}</Comment>
            <Rating>{review.rating} / 5</Rating>
          </Review>
        ))}
      </ReviewsList>
    </>
  );
};

const Mandatory = styled.Text`
  color: red;
`;

const ReviewsList = styled.ScrollView`
  width: 100%;
  height: 300px;
  margin-top: 20px;
`;

const Review = styled.View`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 4px 8px;
`;

const Comment = styled.Text`
  font-size: 14px;
  color: black;
`;

const Rating = styled.Text`
  font-size: 12px;
  color: black;
  font-weight: bold;
`;

export default Reviews;
