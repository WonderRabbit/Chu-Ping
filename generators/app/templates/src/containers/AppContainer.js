import { connect } from 'react-redux';
import { fetchGreetingRequest } from '../actions';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    error: state.app.error,
    message: state.app.isLoading ? 'Loading through Redux Saga...' : state.app.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchGreeting: function () {
      dispatch(fetchGreetingRequest());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
