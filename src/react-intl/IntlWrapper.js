import React, {useEffect, useState, useReducer} from 'react';
import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';
import {IntlProvider} from 'react-intl';
// import {DEFAULT_LOCALE, DEFAULT_CURRENCY} from '@config/locale';
// import {IntlContextProvider} from '@wrappers/core/hooks';
import Messages from './messages/messages';

export const IntlWrapper = ({children}) => {
  const {locale} = useSelector((state) => state.intlModel);
  console.log('IntlWrapper.js locale=', locale);

  const [messages, setMessages] = useState(Messages[locale]);

  useEffect(() => {
    console.log('IntlWrapper.js useEffect locale changed to =', locale);
    setMessages(Messages[locale]);
  }, [locale]);

  useEffect(() => {
    console.log('IntlWrapper.js useEffect messages changed to =', messages);
  }, [messages]);

  return (
    <IntlProvider
      // defaultLocale={DEFAULT_LOCALE}
      // formats={{
      //   number: {
      //     money: {
      //       currency: DEFAULT_CURRENCY,
      //       style: 'currency',
      //       currencyDisplay: 'symbol',
      //     },
      //   },
      // }}
      // initialNow={initialNow}
      locale={locale}
      messages={messages}
      // textComponent={Text}
    >
      {children}
      {/*<IntlContextProvider>{children}</IntlContextProvider>*/}
    </IntlProvider>
  );
};

IntlWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // intl: PropTypes.shape({
  //   initialNow: PropTypes.number,
  //   locale: PropTypes.string,
  //   messages: PropTypes.object,
  // }).isRequired,
};

export default IntlWrapper;
