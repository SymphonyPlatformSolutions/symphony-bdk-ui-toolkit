import React, { useState } from 'react';
import Axios from 'axios';
import Search from '../index';
import Box from '../../../layout/box';
import Text from '../../../misc/text';

const ResultCard = (props) => {
  const {
    Icon: { URL },
    FirstURL,
  } = props;
  return (
    <div>
      <img src={URL} />
      <Text>{props.Text}</Text>
      <br />
      <a href={FirstURL}>Link</a>
    </div>
  );
};

export const DuckDuckGoWrapper = () => {
  const [currentdata, setCurrentdata] = useState([]);
  const [chosenResult, setChosenResult] = useState(null);
  const searchFunc = async (searchTerm) => {
    if (!searchTerm) {
      setCurrentdata([]);
      return;
    }

    const results = await Axios.get(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(
        searchTerm,
      )}&format=json`,
    );

    const STRING_CUT = 50;
    const endResults = results.data.RelatedTopics.map((el) => {
      if (el.Text) {
        return {
          ...el,
          shortened:
            el.Text.length > STRING_CUT
              ? `${el.Text.slice(0, STRING_CUT)}...`
              : el.Text,
        };
      }
      return {
        ...el.Topics[0],
        shortened:
          el.Topics[0].Text.length > STRING_CUT
            ? `${el.Topics[0].Text.slice(0, STRING_CUT)}...`
            : el.Topics[0].Text,
      };
    });
    setCurrentdata(endResults);
  };

  return (
    <Box type="secondary">
      <Box horizontal style={{ width: '500px' }}>
        <Search
          placeholder="Search DuckDuckGo..."
          data={currentdata}
          searchHandler={searchFunc}
          dataLabel="shortened"
          resultHandler={setCurrentdata}
          itemChooseHandler={setChosenResult}
        />
      </Box>
      {chosenResult && <ResultCard {...chosenResult} />}
    </Box>
  );
};
