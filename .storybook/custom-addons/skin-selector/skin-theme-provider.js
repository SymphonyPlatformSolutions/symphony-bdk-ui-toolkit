import React, {useEffect, useState} from 'react';
import addons from '@storybook/addons';

export const SizeContext = React.createContext('normal');

export const SkinThemeProvider = (props) => {
  const {sizes, children} = props;
  const [availableSizes] = useState(sizes);
  const [currentSize, setCurrentSize] = useState('normal');
  const onSelectSize = (size) => {
    setCurrentSize(size);
  }
  useEffect(() => {
    const channel = addons.getChannel();
    channel.on('selectSize', onSelectSize);
    channel.emit('setSizes', sizes);
    return () => {
      channel.removeListener('selectSize', onSelectSize);
    }
  }, []);

  return <SizeContext.Provider value={currentSize}>{children}</SizeContext.Provider>

};
