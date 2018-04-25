import React from 'react';
import ReactDOM from 'react-dom';
import {
    Provider as Provider
} from 'react-redux';
import store from './reducers';
import {BrowserRouter, Route} from 'react-router-dom';
import Wrapper from 'boxes/Wrapper';
import moment from 'moment';
moment.locale('zh-cn', {
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});
require('styles/common/index.css');


const App = () => (
    <BrowserRouter basename='/'>
        <Route path='/' component={Wrapper} />
    </BrowserRouter>
);

ReactDOM.render(
    <Provider store={store}>
        {<App/>}
    </Provider>,
    document.getElementById('container')
);
