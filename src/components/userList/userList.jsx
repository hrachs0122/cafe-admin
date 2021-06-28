import React, { useState } from 'react';
import {Table, Drawer, Button, Form, Input, Select, Upload } from 'antd';
import './userList.css';


const {Option} = Select;

const UserList = () => {
    const [visible, setVisible] = useState();
    const [add, setAdd] = useState();
    const [selectIndex, setSelectIndex] = useState();
    const [dataSource, setDataSource] = useState(
      [
        {
          key: 1,
          username: '홍길동',
          number: 1,
          dept: 'team01',
        },
        {
          key: 2,
          username: '홍길동',
          number: 2,
          dept: 'team02',
        },
      ]
    );
    const [form] = Form.useForm();
    const showDrawer = (add, text) => {
      setVisible(true);

      console.log(add === '추가' ? '추가' : '수정') 
      if (add === '수정') {
        setSelectIndex(text.key)  
        form.setFieldsValue(
          text
        )
      } else {
        form.resetFields()
      }

      setAdd(add);
    };

    const onClose = () => {
      setVisible(false);
    };

    const onRemove = (key) => {
      setDataSource(dataSource.filter((item) => item.key !== key));
    };
  
    const onFinish = (value) => {
      if (add === '추가') {
        const newData = {
          key: dataSource.length + 1,
          username: value.username,
          dept: value.dept,
        };
        setDataSource(
         [...dataSource, newData]
        );
     
      } else { 
    
        const updateData = dataSource.map((arr) =>  arr.key === selectIndex ? {  ...dataSource[selectIndex - 1],
          ...value} : arr);

        setDataSource(
          updateData
        )
    };
    onClose();
  }

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
        render: (record, text, index) =>
          <button 
            onClick={() => showDrawer('수정', text)}
          >수정</button>
      },
    ]; 
      
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
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="username" label="이름" >
              <Input placeholder="이름" />
            </Form.Item>
            <Form.Item name="number" label="번호">
              <Input 
              placeholder="번호" 
              
              />
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
              <Button>Upload</Button>
            </Upload>
            <Button 
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