/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
//import keys from '../../config/keys';

const stripe = Stripe('pk_test_51KAwCUSDy9T0yMUS0qGCzCU7aJ0kOyXvOMqinxvPyaBOUhYrnqk4ef9qpktfkqB6dO8r9TDQqIH7CNg06mNIESPS00HFEyK8MF');

export const bookTour = async tourId => {
   try {
      // 1) Get checkout session from API
      const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
      // console.log(session);

      // 2) Create checkout form + charge credit card
      await stripe.redirectToCheckout({
         sessionId: session.data.session.id
      });
   } catch (err) {
      console.log(err);
      showAlert('error', err);
   }
};
