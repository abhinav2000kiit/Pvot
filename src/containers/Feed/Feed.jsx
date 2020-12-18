import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import VirtualTradeItemFeed from './VirtualTradeItemFeed';
import VirtualImageFeed from './VirtualImageFeed';
import VirtualLinkItemFeed from './VirtualLinkItemFeed';
import VirtualVideoItemFeed from './VirtualVideoItemFeed';
// import waiting from '../../assets/gifs/waiting.gif';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading';

const Feed = props => {
  const [filteredData, setFilteredData] = React.useState([]);
  const { feed, segmentFilter, tradeTypeFilter } = props;
  React.useEffect(() => {
    props.getFeed();
    // props.getFeedImages(props.signinData && props.signinData.token && props.signinData.token.AuthenticationResult.AccessToken);
  }, []);

  console.log(feed);

  React.useEffect(() => {
    if (feed) {
      const segmentIdentifiers = Object.keys(segmentFilter);
      const activeSegment = segmentIdentifiers.filter(function(id) {
        return segmentFilter[id];
      });
      const tradeTypeIdentifiers = Object.keys(tradeTypeFilter);
      const activeTradeType = tradeTypeIdentifiers.filter(function(id) {
        return tradeTypeFilter[id];
      });

      var filteredSegmentData = feed.filter(function(item) {
        for (var segment in activeSegment) {
          if (item.data_type === 'TRADE') {
            if (item.segment.name === activeSegment[segment].toUpperCase()) return item;
          } else return item;
        }
      });

      var filteredData = filteredSegmentData.filter(function(item) {
        for (var tradeType in activeTradeType) {
          if (item.data_type === 'TRADE') {
            if (item.trade_type === activeTradeType[tradeType].toUpperCase()) return item;
          } else return item;
        }
      });
      setFilteredData(filteredData);
    }
  }, [segmentFilter, tradeTypeFilter, feed]);

  return (
    <Slide direction='left' in={true} timeout={300} mountOnEnter unmountOnExit>
      <div>
        {!props.loader && props.feed && filteredData ? (
          <div style={{ padding: '5px', width: '100%', marginTop: '15px' }}>
            
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((v, idx) => {
                if (v.data_type === 'TRADE') return <VirtualTradeItemFeed data={v} id={`trade${idx}`} />;
                if (v.data_type === 'IMAGE') return <VirtualImageFeed data={v} />;
                if (v.data_type === 'LINK') return <VirtualLinkItemFeed data={v} />;
                if (v.data_type === 'VIDEO') return <VirtualVideoItemFeed data={v} />;
              })
            ) : (
              <></>
            )}

            {/* feed images */}

            {/* {feedImages && feedImages.length > 0 ? (
            feedImages
             .map(v => <VirtualImageFeed data={v} />)
          ) : (
            <Typography className='text-secondary'>No Images Found</Typography>
          )} */}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </Slide>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  feed: state.user.feed,
  feedImages: state.user.feedImages
});

const mapDispatchToProps = dispatch => ({
  getFeed: () => dispatch(actions.getFeed())
  // getFeedImages: token => dispatch(actions.getFeedImages(token)) // not removing this as this might be useful later
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
