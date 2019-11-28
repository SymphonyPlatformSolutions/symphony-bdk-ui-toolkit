import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
} from '@storybook/addon-knobs';
import styled, { keyframes } from 'styled-components';
import { UpArrow } from 'styled-icons/boxicons-solid';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import Table from '../../base/table';
import Text from '../../base/text';
import SSEventsListWrapper from './index';

const fadeOut = () => keyframes`
  from {
    opacity: 1
  }

  to {
    opacity: 0;
  }
`;

const StyledArrow = styled(UpArrow)`
  opacity: 0;
  transform: ${props => (props.increased ? '0' : 'rotate(180deg)')};
  animation: ${fadeOut} 3s ease-in-out;;
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
    <Box horizontal justify="center" align="center" style={{ transform: 'translateX(-20px)' }}>
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

const SSEEventsSample = ({
  data, loading, error, refreshData,
}) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    if (data && data.length && tableData && tableData.length > 0) {
      const newData = Array.from(data);

      newData.forEach((elem) => {
        elem.increasedAsk = null;
        elem.increasedBid = null;
      });

      newData.forEach((element) => {
        if (element.updated) {
          const index = tableData.findIndex(value => element.id === value.id);
          if (index !== -1) {
            element.increasedAsk = tableData[index].ask < element.ask;
            element.increasedBid = tableData[index].bid < element.bid;
          }
        }
      });
      setTableData(Array.from(newData));
    } else {
      setTableData(Array.from(data));
    }
  }, [data]);

  return (
    <Table
      data={tableData}
      loading={loading}
      columns={SSE_EVENTS_TABLE_COLUMNS}
    />
  );
};


storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add('SSE Events', () => (
    <StoryWrapper p={15}>
      <Box p={15}>
        <SSEventsListWrapper
          sseEndpoint="http://localhost:3000/sse-events"
          autoFetchConfig={autoFetchConfig}
        >
          <SSEEventsSample />
        </SSEventsListWrapper>
      </Box>
    </StoryWrapper>
  ),
  {
    notes: {
      markdown: Info,
    },
  });
