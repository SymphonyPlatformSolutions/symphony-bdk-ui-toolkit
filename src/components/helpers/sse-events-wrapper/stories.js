import React, { useEffect, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import { SSEProvider, useSSE } from 'react-hooks-sse';
import styled, { keyframes } from 'styled-components';
import { UpArrow } from 'styled-icons/boxicons-solid';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import Table from '../../base/table';
import Text from '../../base/text';
import { AutoFetchWrapper } from '../../index';


const StyledArrow = styled(UpArrow)`
  transform: ${props => (props.increased ? '0' : 'rotate(180deg)')};
`;


const PriceAskCell = ({ value, original }) => {
  const arrowColor = original.increasedAsk ? '#10C820' : '#FF4840';
  const hasArrow = original.updated && value;
  return (
    <Box horizontal justify="center" align="center">
      <Box type="flat" style={{ width: '50px' }}>
        <StyledAnimatedPrice type="ask" updated={original.updated}>{value}</StyledAnimatedPrice>
      </Box>
      <Box type="flat" style={{ width: '50px', transform: 'translateX(-20px)' }}>
        { hasArrow && <StyledArrow color={arrowColor} size={24} increased={original.increasedAsk} /> }
      </Box>
    </Box>
  );
};

const PriceBidCell = ({ value, original }) => {
  const arrowColor = original.increasedBid ? '#10C820' : '#FF4840';
  const hasArrow = original.updated && value;
  return (
    <Box horizontal justify="center" align="center" style={{transform: 'translateX(-20px)'}}>
      <Box type="flat" style={{ position: 'absolute', transform: 'translateX(-30px)' }}>
        { hasArrow && <StyledArrow color={arrowColor} size={24} increased={original.increasedBid} /> }
      </Box>
      <Box type="flat" style={{ width: '50px' }}>
        <StyledAnimatedPrice type="bid" updated={original.updated}>{value}</StyledAnimatedPrice>
      </Box>
    </Box>
  );
};

const fadeIn = props => keyframes`
  from {
    background-color: ${props.bg};
  }

  to {
    background-color: initial;
  }
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary_200};
`;

const StyledAnimatedPrice = styled(Text).attrs(({ theme, updated, type }) => ({
  color: type === 'ask' ? theme.colors.error_500 : theme.colors.primary_400,
  bg: updated ? type === 'ask' ? theme.colors.error_100 : theme.colors.primary_100 : 'initial',
}))`
  color: ${props => props.color};
  animation: ${fadeIn} 2s ease-in-out;
  text-align: center;
  padding: 0px 10px;
  border-radius: 4px;
`;

const quickDateSort = (a, b) => new Date(b.time) - new Date(a.time);

const getRenderTime = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const SSE_EVENTS_TABLE_COLUMNS = [
  {
    Header: 'Type',
    tooltip: 'Operation type',
    accessor: 'type',
    width: 80,
    sortable: false,
  },
  {
    Header: 'Asset Class',
    tooltip: 'Asset class being traded',
    accessor: 'asset',
    sortable: false,
    width: 120,
  },
  {
    Header: 'Product',
    tooltip: 'Product being traded',
    accessor: 'product',
    sortable: false,
    width: 150,
  },
  {
    Header: 'Size',
    tooltip: 'The amount of equity being traded at this bid price',
    accessor: 'bidSize',
    width: 100,
  },
  {
    Header: 'Bid',
    tooltip: 'The latest Bid price',
    accessor: 'bid',
    Cell: PriceBidCell,
    width: 100,
  },
  {
    Header: 'Ask',
    tooltip: 'The latest Ask price',
    accessor: 'ask',
    Cell: PriceAskCell,
    width: 100,
  },
  {
    Header: 'Size',
    tooltip: 'The amount of equity being traded at this ask price',
    accessor: 'askSize',
    width: 100,
  },
  {
    Header: 'Time',
    tooltip: 'last time updated',
    accessor: 'time',
    sortable: false,
    Cell: ({ value }) => (
      <Text>{getRenderTime(value)}</Text>
    ),
    width: 100,
  },
  {
    Header: 'Dealer',
    tooltip: 'The contact',
    accessor: 'dealer',
    Cell: ({ original }) => (original.dealer.link ? (
      <StyledLink href={original.dealer.link}>{original.dealer.name}</StyledLink>
    ) : (
      <Text>{original.dealer.name}</Text>
    )),
    sortable: false,
  },
  {
    Header: 'Comment',
    tooltip: 'The person picture',
    accessor: 'comment',
    sortable: false,
  },

];

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/financial-demo',
  params: {},
  handleData: results => results,
};


const SSEEventsSample = ({ data, loading, refreshData }) => {
  const state = useSSE('message');
  const [tableData, setData] = useState([]);

  useEffect(() => {
    if (data !== tableData) {
      const newData = data.map((elem) => {
        elem.updated = false;
        return elem;
      });
      setData(newData);
    }
  }, [data]);

  useEffect(() => {
    if (state && state.data !== null && state.data.length && tableData && tableData.length) {
      tableData.forEach((elem) => {
        elem.updated = false;
        elem.increasedAsk = null;
        elem.increasedBid = null;
      });

      state.data.forEach((element) => {
        const index = tableData.findIndex(value => element.id === value.id);
        element.updated = true;
        element.increasedAsk = tableData[index].ask < element.ask;
        element.increasedBid = tableData[index].bid < element.bid;
        tableData[index] = element;
      });
      setData(Array.from(tableData));
    }
  }, [state]);

  return useMemo(() => (
    <Table
      data={tableData}
      loading={loading}
      columns={SSE_EVENTS_TABLE_COLUMNS}
    />
  ), [tableData]);
};


storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add('SSE Events', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <SSEProvider endpoint="http://localhost:3000/sse-events">
          <AutoFetchWrapper config={autoFetchConfig}>
            <SSEEventsSample />
          </AutoFetchWrapper>
        </SSEProvider>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
