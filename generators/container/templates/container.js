import { connect } from 'react-redux';
import <%= pascalName %> from '../components/<%= pascalName %>';

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(<%= pascalName %>);
