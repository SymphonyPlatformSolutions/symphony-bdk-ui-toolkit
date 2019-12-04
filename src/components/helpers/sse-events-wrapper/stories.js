import React, { useEffect, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import styled, { keyframes, withTheme } from 'styled-components';
import { UpArrow } from 'styled-icons/boxicons-solid';
import Box from '../../base/box';
import { StoryWrapper } from '../../base/wrappers';
import Info from './info.md';
import Table from '../../base/table';
import Text from '../../base/text';
import SSEventsListWrapper from './index';
import { RestClient } from '../../../utils';
import { Card } from '../../index';
import Button from '../../base/button';
import MessageBox from '../../base/message-box';
import TextLink from '../../base/text-link';
import Toggle from '../../base/toggle';
import { TBodyTr, CellWrapper } from '../../base/table/theme';

const StyledArrow = styled(UpArrow)`
  transform: ${props => (props.increased ? '0' : 'rotate(180deg)')};
`;

const PriceAskCell = ({ cell: { value }, row: { original } }) => (
  <CellWrapper>
    <StyledAnimatedPrice type="ask" animating={original.animating}>
      {value}
    </StyledAnimatedPrice>
  </CellWrapper>
);

const PriceBidCell = ({ cell: { value }, row: { original } }) => (
  <CellWrapper>
    <StyledAnimatedPrice type="bid" animating={original.animating}>
      {value}
    </StyledAnimatedPrice>
  </CellWrapper>
);
const StyledLink = styled(TextLink)`
  color: ${({ animating, theme }) => (animating ? theme.colors.primary_800 : theme.colors.primary_200)};
`;

const StyledAnimatedPrice = styled(Text).attrs(
  ({ theme, type, animating }) => ({
    color:
      type === 'ask'
        ? animating
          ? theme.colors.misc_19
          : theme.colors.error_500
        : animating
          ? theme.colors.primary_800
          : theme.colors.primary_400,
  }),
)`
  color: ${props => props.color};
`;

const getRenderTime = (time) => {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const StyledText = styled(Text).attrs(({ theme, animating }) => ({
  color: animating ? theme.colors.white : null,
}))`
  color: ${props => props.color} !important;
`;

const RegularRow = ({ cell, row: { original } }) => useMemo(() => {
  if (cell.animating) {
    console.log(cell);
  }
  return (
    <CellWrapper>
        <StyledText {...original}>{cell.value}</StyledText>
      </CellWrapper>
  );
}, [cell]);

const SSE_EVENTS_TABLE_COLUMNS = [
  {
    header: 'Type',
    tooltip: 'Operation type',
    accessor: 'type',
    sortable: true,
    Cell: RegularRow,
    width: 90,
  },
  {
    header: 'Asset Class',
    tooltip: 'Asset class being traded',
    accessor: 'asset',
    sortable: false,
    Cell: RegularRow,
    width: 160,
  },
  {
    header: 'Product',
    tooltip: 'Product being traded',
    accessor: 'product',
    sortable: false,
    Cell: RegularRow,
    width: 120,
  },
  {
    header: 'Size',
    accessor: 'bidSize',
    Cell: RegularRow,
    width: 80,
  },
  {
    header: 'Bid',
    accessor: 'bid',
    Cell: PriceBidCell,
    sortable: false,
    width: 50,
  },
  {
    header: 'Ask',
    accessor: 'ask',
    sortable: false,
    Cell: PriceAskCell,
    width: 80,
  },
  {
    header: 'Size',
    tooltip: 'The amount of equity being traded at this ask price',
    accessor: 'askSize',
    Cell: RegularRow,
    width: 50,
  },
  {
    header: '',
    accessor: 'empty',
    sortable: false,
    Cell: ({ row: { original } }) => {
      const arrowColor = original.increasedBid ? '#10C820' : '#DD3638';
      const hasArrow = original.animating;
      const increased = original.increasedAsk || original.increasedBid;
      return hasArrow ? (
        <CellWrapper>
          <StyledArrow color={arrowColor} size={24} increased={increased} />
        </CellWrapper>
      ) : null;
    },
    width: 100,
  },
  {
    header: 'Time',
    tooltip: 'last time updated',
    accessor: 'time',
    sortable: true,
    Cell: ({ cell: { value }, row: { original } }) => useMemo(
      () => (
        <CellWrapper>
            <StyledText {...original}>{getRenderTime(value)}</StyledText>
          </CellWrapper>
      ),
      [value],
    ),
    width: 80,
  },
  {
    header: 'Dealer',
    tooltip: 'The contact',
    accessor: 'dealer',
    Cell: ({ row: { original } }) => useMemo(
      () => (
        <CellWrapper>
            {original.dealer.link ? (
              <StyledLink
                animating={original.animating}
                href={original.dealer.link}
              >
                {original.dealer.name}
              </StyledLink>
            ) : (
              <StyledText {...original}>{original.dealer.name}</StyledText>
            )}
          </CellWrapper>
      ),
      [original],
    ),
    sortable: true,
    width: 120,
  },
  {
    header: 'Comment',
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

const CustomTr = styled(TBodyTr)`
  transition: ${({ animating }) => (animating
    ? 'background-color 0.5s cubic-bezier(1,.02,.41,.37)'
    : undefined)};
  background-color: ${({ animating, theme, increased }) => (animating
    ? increased
      ? theme.colors.misc_18
      : theme.colors.error_400
    : null)};
`;

const CustomRow = (props) => {
  const { children, original, ...rest } = props;
  const increased = original.increasedAsk || original.increasedBid;

  return (
    <CustomTr animating={original.animating} increased={increased} {...rest}>
      {children}
    </CustomTr>
  );
};

const postDemo = async (action, isAuto = null, interval = null) => {
  try {
    await RestClient.post(
      'http://localhost:3000/financial-demo',
      { action, isAuto, interval },
      {},
      false,
    );
  } catch (e) {
    console.error(e);
  }
};

const SSEEventsSample = ({
  data, loading, refreshData, eventType,
}) => {
  const [tableData, setTableData] = useState(data);
  const [autoPilot, setAutoPilot] = useState(false);

  useEffect(() => {
    if (eventType === 'fetch') {
      setTableData(data);
    } else if (data && data.length && tableData && tableData.length > 0) {
      const newData = Array.from(data);

      newData.forEach((element) => {
        if (element.updated) {
          const mData = tableData.find(e => e.id === element.id);
          element.increasedAsk = mData.ask <= element.ask;
          element.increasedBid = mData.bid <= element.bid;

          if (!mData.animating) {
            element.animating = setTimeout(() => {
              setTableData((prevState) => {
                const index = prevState.findIndex(el => el.id === mData.id);
                if (index !== -1) {
                  const newState = Array.from(prevState);
                  newState[index].animating = null;
                  return newState;
                }
                return prevState;
              });
            }, 10000);
          }
        }
      });
      setTableData(Array.from(newData));
    } else {
      setTableData(Array.from(data));
    }
  }, [data]);

  const handleAutoPilot = async (toggled) => {
    setAutoPilot(toggled);
    postDemo('auto', toggled);
  };

  const onRefresh = () => {
    setTableData([]);
    refreshData();
  };

  return (
    <Box type="flat" vertical>
      <Box>
        <MessageBox type="info">{`Last Message: ${eventType}`}</MessageBox>
      </Box>
      <Box align="end">
        <Card>
          <Box horizontal justify="space-between" align="center">
            <Box>
              <Button onClick={onRefresh}>Refresh</Button>
            </Box>
            <Box horizontal justify="flex-end" align="center">
              <Button disabled={autoPilot} onClick={() => postDemo('create')}>
                Add data
              </Button>
              <Button
                disabled={autoPilot || !tableData.length}
                onClick={() => postDemo('update')}
              >
                Update Data
              </Button>
              <Button
                disabled={autoPilot || !tableData.length}
                type="danger"
                onClick={() => postDemo('remove')}
              >
                Remove Data
              </Button>
              <Box vertical align="center" type="flat">
                <Text>Auto Pilot</Text>
                <Toggle toggled={autoPilot} onChange={handleAutoPilot} />
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box>
        <Table
          align="left"
          data={tableData}
          loading={loading}
          columns={SSE_EVENTS_TABLE_COLUMNS}
          Row={CustomRow}
        />
      </Box>
    </Box>
  );
};

const ThemedSample = withTheme(SSEEventsSample);

storiesOf('Helpers', module)
  .addDecorator(withKnobs)
  .add(
    'SSE Events',
    () => (
      <StoryWrapper p={15}>
        <Text isTitle size="small">
          SSEventsListWrapper with table
        </Text>
        <Box p={15}>
          <Box vertical>
            <Text>
              This is an example implementation of SSEEventsListWrapper within a
              table
            </Text>
            <ul>
              <Text>
                <li>The mock server sends an event every 2 seconds</li>
              </Text>
              <Text>
                <li>
                  The events are always coming in this order: update, create,
                  remove and then restart
                </li>
              </Text>
            </ul>
          </Box>
          <SSEventsListWrapper
            sseEndpoint="http://localhost:3000/sse-events"
            autoFetchConfig={autoFetchConfig}
          >
            <ThemedSample />
          </SSEventsListWrapper>
        </Box>
      </StoryWrapper>
    ),
    {
      notes: {
        markdown: Info,
      },
    },
  );
