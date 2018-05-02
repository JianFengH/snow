import React, {
    PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import moment from 'moment';
moment.locale('zh-cn', {
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    week: {
        dow: 0, // Sunday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
});
// import 'styles/common/index.css';
import 'antd/dist/antd.less';

class Wrapper extends PureComponent {
    static propTypes = {

    };
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return <div className={style.box}>
        	this is wrapper
        </div>
    }
}

export default Wrapper;
