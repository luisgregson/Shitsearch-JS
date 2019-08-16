import * as React from "react";
import styled from "styled-components";

import { getRestaurants } from "../utils/fetcher";

const Container = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

export class RestaurantView extends React.Component {
  state = {
    restaurants: []
  };

  filterRestaurantById = id => {
    const matchingRestaurant = this.state.restaurants.find(
      restaurant => restaurant.id === id
    );
    if (matchingRestaurant) {
      this.setState({
        restaurants: [matchingRestaurant]
      });
    }
  };

  searchBox = e => {
    const id = parseInt(e.target.value, 10);
    this.filterRestaurantById({ id });
  };

  resetRestaurantState = async () => {
    const restaurants = await getRestaurants();
    this.setState({
      restaurants
    });
  };

  async componentDidMount() {
    await this.resetRestaurantState();
  }

  render() {
    return (
      <>
        <label>
          Search by id:
          <input onChange={this.searchBox} />
        </label>
        <button onClick={this.refresh}>Clear</button>
        <Container>
          {this.state.restaurants.map(restaurant => (
            <li key={restaurant.id}>
              <h2>{restaurant.name}</h2>
              {restaurant.rating}{" "}
              <span role="img" aria-label="star">
                ⭐️
              </span>
              <br />
              {restaurant.dogFriendly && (
                <>
                  <span role="img" aria-label="dog">
                    🐶
                  </span>{" "}
                  friendly
                </>
              )}
            </li>
          ))}
        </Container>
      </>
    );
  }
}
