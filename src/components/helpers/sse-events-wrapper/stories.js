import React, { useEffect, useMemo, useState } from 'react';
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

const StyledArrow = styled(UpArrow)`
  transform: ${props => (props.increased ? '0' : 'rotate(180deg)')};
  mix-blend-mode: screen;
`;

const FlashAnimation = props => keyframes`
  0%, 100% {
    background-color: initial;
  }
  50% {
    background-color: ${props.bg};
  }
`;

const PriceAskCell = ({ value, original }) => {
  const arrowColor = original.increasedAsk ? '#10C820' : '#FF4840';
  const hasArrow = original.updated && value;
  return (
    <Box horizontal justify="center" align="center">
      <Box type="flat" style={{ width: '50px' }}>
        <StyledAnimatedPrice type="ask">{value}</StyledAnimatedPrice>
      </Box>
      <Box type="flat" style={{ width: '50px', transform: 'translateX(-35px)' }}>
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
        <StyledAnimatedPrice type="bid">{value}</StyledAnimatedPrice>
      </Box>
    </Box>
  );
};

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary_200};
`;

const StyledAnimatedPrice = styled(Text)`
  color: ${({ theme, type }) => (type === 'ask' ? theme.colors.error_500 : theme.colors.primary_400)};
`;

const StyledText = styled(Text)`
  mix-blend-mode: revert;
`;

const getRenderTime = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const RegularRow = ({ value }) => useMemo(() => (
  <Text>{value}</Text>
), [value]);

const SSE_EVENTS_TABLE_COLUMNS = [
  {
    Header: 'Type',
    tooltip: 'Operation type',
    accessor: 'type',
    sortable: false,
    Cell: RegularRow,
  },
  {
    Header: 'Asset Class',
    tooltip: 'Asset class being traded',
    accessor: 'asset',
    sortable: false,
    Cell: RegularRow,
  },
  {
    Header: 'Product',
    tooltip: 'Product being traded',
    accessor: 'product',
    sortable: false,
    Cell: RegularRow,
  },
  {
    Header: 'Size',
    tooltip: 'The amount of equity being traded at this bid price',
    accessor: 'bidSize',
    Cell: RegularRow,
  },
  {
    Header: 'Bid',
    tooltip: 'The latest Bid price',
    accessor: 'bid',
    Cell: PriceBidCell,
  },
  {
    Header: 'Ask',
    tooltip: 'The latest Ask price',
    accessor: 'ask',
    Cell: PriceAskCell,
  },
  {
    Header: 'Size',
    tooltip: 'The amount of equity being traded at this ask price',
    accessor: 'askSize',
    Cell: RegularRow,
  },
  {
    Header: 'Time',
    tooltip: 'last time updated',
    accessor: 'time',
    sortable: false,
    Cell: ({ value }) => useMemo(() => (
      <Text>{getRenderTime(value)}</Text>
    ), [value]),

  },
  {
    Header: 'Dealer',
    tooltip: 'The contact',
    accessor: 'dealer',
    Cell: ({ original }) => useMemo(() => (original.dealer.link ? (
      <StyledLink href={original.dealer.link}>{original.dealer.name}</StyledLink>
    ) : (
      <Text>{original.dealer.name}</Text>
    )), [original]),
    sortable: false,
  },
  {
    Header: 'Comment',
    tooltip: 'The person picture',
    accessor: 'comment',
    sortable: false,
    Cell: RegularRow,
  },
];

const autoFetchConfig = {
  endpoint: 'http://localhost:3000/financial-demo',
  params: {},
  handleData: results => results,
};

const StyledRow = styled.td.attrs(({ theme, increased, updated }) => ({
  bg: updated ? increased ? theme.colors.success_300 : theme.colors.error_400 : 'initial',
}))`
  animation: ${FlashAnimation} .8s steps(1, end);
  animation-iteration-count: 2;
  width: 100%;
  color: ${({ theme }) => theme.colors.grey_900};
  
  div {
    color: inherit;
  }
`;

const RowWrapper = ({ children }) => {
  if (!children.props || !children.props.original) {
    return null;
  }

  const rowData = children.props.original;
  const increased = rowData.increasedAsk || rowData.increasedBid;
  const updated = (children && children.props.original) ? children.props.original.updated : null;

  return useMemo(() => (
    <StyledRow {...children.props} increased={increased} updated={updated}>
      {children}
    </StyledRow>
  ), [children]);
};

const SSEEventsSample = ({
  data, loading, error, refreshData,
}) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    if (data && data.length && tableData && tableData.length > 0) {
      const newData = Array.from(data);

      newData.forEach((elem) => {

      });


      newData.forEach((element) => {
        if (element.updated) {
          const mData = tableData.find(e => e.id === element.id);
          if (mData !== element) {
            element.increasedAsk = mData.ask < element.ask;
            element.increasedBid = mData.bid < element.bid;
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
      TdComponent={RowWrapper}
      loading={loading}
      columns={SSE_EVENTS_TABLE_COLUMNS}
    />
  );
};

storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add('SSE Events', () => (
    <StoryWrapper p={15}>
      <Text isTitle size="small">SSEventsListWrapper with table</Text>
      <Box p={15}>
        <Box vertical>
          <Text>This is an example implementation of SSEEventsListWrapper within a table</Text>
          <ul>
            <Text><li>The mock server sends an event every 2 seconds</li></Text>
            <Text><li>The events are always coming in this order: update, create, remove and then restart</li></Text>
          </ul>
        </Box>
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