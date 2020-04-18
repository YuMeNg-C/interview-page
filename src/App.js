import React, { useState, useEffect } from 'react';
import {Table,Spin, Alert } from 'antd'
import axios from 'axios'
import useInterval from './hooks/index'
import './App.css';

const columns = [
  {
    title: '姓名',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: '住址',
    dataIndex: 'body',
    key: 'body',
  },
  {
    title: '年龄',
    dataIndex: 'id',
    key: 'id',
  }
]

function App({props}) {

  const [baseUrl, setBaseUrl] = useState('https://jsonplaceholder.typicode.com/posts')
  const [list, setList] = useState([])
  const [top, setTop] = useState(0)
  const [drop, setDrop] = useState(true)
  const [fetchCode, setFetchCode] = useState('pending')

  useEffect(async () => {
    const res = await axios.get(baseUrl)
    setList(res.data)
    setFetchCode('200')
  }, [])

  useInterval(() => { setTop(top - 2)}, 100, drop)

  const inDom = () => {
    setDrop(false)
  }

  const outDom = () => {
    setDrop(true)
  }

  
  
  return (
    <div className="App">
      <div className='header'>
        最新职位
        <span style={{float: 'right', paddingRight: '10px'}}>更多</span>
      </div>
        <div className='list'>
          {fetchCode == "200" ?          
          <div className='list-wrapper' style={{top}} onMouseOver={inDom} onMouseLeave={outDom} > 
                <Table
                  showHeader={true}
                  dataSource={props ? props : list }
                  columns={columns}
                  pagination={false}
              />
          </div> :
          <div className='list-loading'>
            <Spin tip="Loading..."/>
          </div>
          }
        </div>
        {/* <div className='list-wrapper' style={{top}} onMouseOver={inDom} onMouseLeave={outDom}>
          {
            fetchCode == "200" ? 
            <Table
              showHeader={true}
              dataSource={props ? props : list }
              columns={columns}
              pagination={false}
          /> : null
          }
      </div> */}
    </div>
  );
}

export default App;
