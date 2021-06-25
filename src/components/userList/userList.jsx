import React, { useState } from 'react';
import {Table, Drawer, Button, Form, Input, Select, Upload } from 'antd';
import './userList.css';

const {Option} = Select;

const UserList = () => {
    const [visible, setVisible] = useState();
    const [add, setAdd] = useState();
    const [dataSource, setDataSource] = useState(
      [
        {
          key: 1,
          username: '홍길동',
          dept: 'team01',
        },
        {
          key: 2,
          username: '홍길동',
          dept: 'team02',
        },
      ]
    );

    const showDrawer = (add) => {
      setVisible(true);
      console.log(add === '추가' ? '추가' : '수정') 
      setAdd(add);
    };
    const onClose = () => {
      setVisible(false);
    };

    const onRemove = (key) => {
      setDataSource(dataSource.filter((item) => item.key !== key));
    };
    
    const onFinish = (value) => {
      console.log(value);
      const newData = {
        key: dataSource.length + 1,
        username: value.username,
        dept: value.dept,
      };
      setDataSource(
       [...dataSource, newData]
      );
      console.log(newData);
    };

    const fileList = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]
      
    const columns = [
      {
        title: '이름',
        dataIndex: 'username',
        width: '30%',
        key: 'username',
      },
      {
        title: '소속',
        dataIndex: 'dept',
        width: '30%',
        key: 'dept',
      },
      {
        title: '삭제',
        dataIndex: 'delete',
        width: '10%',
        render: (_, record) =>
          <button onClick={() => onRemove(record.key)} >삭제</button>
      },
      {
        title: '수정',
        dataIndex: 'edit',
        width: '10%',
        render: () =>
          <button onClick={() => showDrawer('수정')}>수정</button>
      },
    ]; 
    console.log(dataSource);
      
    return (
      <>
        <Button
          onClick = {() => showDrawer('추가')}
          style={{
            margin: 16,
          }}
        >
          추가
        </Button>
        <Drawer
          title={add}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={300}
          footer={
            <div style={{textAlign: 'right'}}> 
              <Button onClick={onClose} style={{marginRight: 8}}>
                닫기
              </Button>
            </div>
          }
        > 
          <Form onFinish={onFinish}>
            <Form.Item name="username" label="이름">
              <Input placeholder="이름"/>
            </Form.Item>
            <Form.Item name="number" label="번호">
              <Input placeholder="번호"/>
            </Form.Item>
            <Form.Item name="dept" label="부서">
              <Select placeholder="부서 선택">
                <Option value="team01">team01</Option>
                <Option value="team02">team02</Option>
              </Select>
            </Form.Item>
            <Upload
              action='file'
              listType="picture"
              defaultFileList={[...fileList]}
            >
            </Upload>
            <Button 
                onClose={onClose} 
                htmlType="submit"
                style={{marginTop: 15}}
            >
              확인
            </Button>
          </Form> 
        </Drawer>
        <Table dataSource={dataSource} columns={columns} />
      </>
    );
};

export default UserList;