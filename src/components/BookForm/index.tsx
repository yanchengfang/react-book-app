import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { bookAdd } from "../../api/book"
import {
  Button,
  Image,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
  message,
} from 'antd';
import type { BookType } from '../../types';
import { Content } from '../Content';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const BookForm: React.FC = ({title}) => {
  const [form] = Form.useForm();
  const router = useNavigate()
  const [preview, setPreview] = useState("");

  const handleFinish = async (values: BookType) => {
    if(values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf()
    }
    await bookAdd(values)
    message.success("创建成功")
    router("/book")
  }
  return (
    <Content title="图书添加" >
      <Form
        style={{padding: "32px"}}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item 
          label="名称" 
          name="name" 
          rules={[
            { 
              required: true, 
              message: '请输入名称' 
            }
          ]}>
          <Input placeholder='请输入'/>
        </Form.Item>
        <Form.Item 
          label="作者"
          name="author"
          rules={[
            { 
              required: true, 
              message: '请输入作者' 
            }
          ]}
        >
          <Input placeholder='请输入'/>
        </Form.Item>
        <Form.Item 
          label="分类" 
          name="category"
          rules={[
            { 
              required: true, 
              message: '请选择分类' 
            }
          ]}
        >
          <Select options={[{ label: 'Demo', value: 'demo' }]} />
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button type="primary" onClick={() => {
              setPreview(form.getFieldValue("cover"));
            }}>
              预览
            </Button>
          </Space.Compact>
        </Form.Item>
        {preview && (
          <Form.Item label=" " colon={false}>
            <Image width={200} height={200} alt="封面" src={preview} />
          </Form.Item>
        )}
        <Form.Item label="出版日期" name="publishAt">
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="库存" name="stock">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button
            size="large"
            type="primary" 
            htmlType="submit"
          >Submit</Button>
        </Form.Item>
      </Form>
    </Content>
  );
};