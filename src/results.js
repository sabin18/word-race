import { React,Component} from 'react';
import {Row,Table} from 'react-bootstrap'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GetAllResults } from './actions/ResultsActions';
import moment from "moment"

class Results extends Component {

  componentDidMount = async () => {
    await this.props.GetAllResults();
   
  }
render() {
  const { results } = this.props;
  const TotalEarnedMarks=results&&results?.data?.map((result)=>result.score).reduce((a, b) => a + b, 0);
  const levels= results&&results?.data?.map((result)=>result.level);
  console.log(levels)
  const average =TotalEarnedMarks/results?.data?.length;
return(
    <>
    {results&&
    <Row>
    <Table striped bordered hover className="bg-white">
  <thead>
  <tr>
  <th> Game played:{results.data.length}</th>
  <th>Average score:{TotalEarnedMarks===0?0:Math.round(average * 10) / 10}</th>
  <th>Max level:{levels.length===0?0:Math.max(...levels)}</th>
    <th>Total scrore:{TotalEarnedMarks}</th>
  </tr>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>level</th>
      <th>scrore</th>
      
    </tr>
  </thead>
 {results.data.map((item,index)=>(
  <tbody>
    <tr>
 <td>{index+1}</td>
 <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
  <td>{item.level}</td>
  <td>{item.score}</td>
    </tr>
  </tbody>
 ))}
</Table>
</Row>
}
</>
);
}
}

Results.propTypes = {
  GetAllResults: PropTypes.func,
  results: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  results: state.results.results,
  resultsError: state.results.resultsError,
});

export default withRouter(connect(mapStateToProps, {
  GetAllResults
})(Results));
