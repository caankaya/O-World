import { configureStore } from '@reduxjs/toolkit';
import axiosInstance from '../../src/utils/axios';
import countryReducer, {
  clearCountryAlert,
  fetchRestCountries,
  resetCountryData,
} from '../../src/GlobalRedux/store/reducers/country';

/**
 * Tests for the countryReducer.
 */
describe('countryReducer', () => {
  let store;

  beforeEach(() => {
    // Configure the Redux store with the countryReducer
    store = configureStore({ reducer: { country: countryReducer } });
  });

  /**
   * Test case: should clear country alert.
   */
  it('should clear country alert', () => {
    // Dispatch the clearCountryAlert action
    store.dispatch(clearCountryAlert());
    // Get the state from the store
    const state = store.getState().country;
    // Assert that the alert property is null
    expect(state.alert).toBeNull();
  });

  /**
   * Test case: should fetch country data successfully.
   */
  it('should fetch country data successfully', async () => {
    // Mock response for successful data retrieval
    const mockResponse = {
      data: {
        /* country data */
      },
    };
    // Mock the axiosInstance.get method to return the mockResponse
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Dispatch the fetchRestCountries action
    await store.dispatch(fetchRestCountries('countryId'));

    // Get the state from the store
    const state = store.getState().country;
    // Assert that the loading and infiniteLoading properties are false
    expect(state.loading).toBe(false);
    expect(state.infiniteLoading).toBe(false);
    // Assert that the data property matches the mockResponse data
    expect(state.data).toEqual(mockResponse.data);
    // Assert that the alert property is null
    expect(state.alert).toBeNull();
  });

  /**
   * Test case: should handle fetch country data error.
   */
  it('should handle fetch country data error', async () => {
    // Error message for the mock response
    const errorMessage = 'Error message';
    // Mock response for error case
    const mockResponse = {
      response: {
        data: { message: errorMessage },
      },
    };
    // Mock the axiosInstance.get method to reject the mockResponse
    axiosInstance.get = jest.fn().mockRejectedValue(mockResponse);

    try {
      // Dispatch the fetchRestCountries action
      await store.dispatch(fetchRestCountries('countryId'));
    } catch (error) {
      // Catch the error and assert that the error message matches the errorMessage
      expect(error.message).toBe(errorMessage);
    }

    // Get the state from the store
    const state = store.getState().country;
    // Assert that the loading property is false and infiniteLoading property is true
    expect(state.loading).toBe(false);
    expect(state.infiniteLoading).toBe(true);
    // Assert that the alert property matches the error message
    expect(state.alert).toEqual({
      type: 'error',
      message: errorMessage,
    });
  });

  /**
   * Test case: should reset country data.
   */
  it('should reset country data', () => {
    // Dispatch the resetCountryData action
    store.dispatch(resetCountryData());
    // Get the state from the store
    const state = store.getState().country;
    // Assert that the data property is null
    expect(state.data).toBeNull();
  });
});
