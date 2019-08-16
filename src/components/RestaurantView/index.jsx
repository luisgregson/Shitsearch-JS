import React, { Fragment } from 'react';
import { Container } from './RestaurantView.css';
import { getRestaurants } from '../../utils/fetcher';

export default class RestaurantView extends React.Component {
  state = {
    restaurants: [],
  };

  async componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = async () => {
    const restaurants = await getRestaurants();
    this.setState({
      restaurants,
    });
  };

  onSearchBoxChange = ({ target: { value } }) => {
    const id = Number(value);
    this.checkRestaurantId(id);
  };

  checkRestaurantId = id => {
    const filteredRestaurants = this.state.restaurants.filter(
      data => data.id === id,
    );
    if (filteredRestaurants.length === 1) {
      this.setState({
        restaurants: filteredRestaurants,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <label>
          Search by id:
          <input onChange={this.onSearchBoxChange} />
        </label>
        <button onClick={this.fetchRestaurants}>Clear</button>
        <Container>
          {this.state.restaurants.map(
            ({ id, name, rating, dogFriendly }) => (
              <li key={id}>
                <h2>{name}</h2>
                {rating}{' '}
                <span role="img" aria-label="star">
                  ⭐️
                </span>
                <br />
                {dogFriendly && (
                  <Fragment>
                    <span role="img" aria-label="dog">
                      🐶
                    </span>{' '}
                    friendly
                  </Fragment>
                )}
              </li>
            ),
          )}
        </Container>
      </Fragment>
    );
  }
}
