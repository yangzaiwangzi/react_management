import React from 'react';
import {GET} from './../../api/index.js'
class Library extends React.Component {
    async componentDidMount(){
        const _data = await GET('http://portal-test.zmlearn.com/api/auth/sys/initInfo?appCode=a1682029687e4eba80bba731f8e6db68');
    }
    render() {
        return <h1>Hello</h1>;
    }
}
export default Library;
