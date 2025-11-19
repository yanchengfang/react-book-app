import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookAdd, getCategoryList } from "../../api"
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
import type { BookType, CategoryType, ResType } from '../../types';
import { Content } from '../Content';
import defaultPic from '../../assets/default-book-pic.png'
import dayjs from 'dayjs';

const { TextArea } = Input;

interface IProps {
  title: string;
  editData?: BookType;
}

export const BookForm: React.FC<IProps> = ({title, editData}) => {
  // const messageApi = useMessage()
  const [form] = Form.useForm();
  const router = useNavigate()
  const [preview, setPreview] = useState("");
  const [categoryList, setCategoryList] = useState<{label: string, value: string | undefined}[]>([]);
  // const [showCategory, setShowCategory] = useState<CategoryType["_id"]>()
  const [cover, setCover] = useState<CategoryType["cover"]>()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getCategoryList({
      all: true,
    }).then((res) => {
      const { data } = res as ResType<CategoryType>
      const selectList = data.map((i: CategoryType) => ({label: i.name, value: i._id}))
      setCategoryList(selectList);
      setLoading(false)
    });
  }, []);

  useEffect(() => {
    if (editData) {
      const data = {
        ...editData,
        category: editData.category
          ? (editData.category as unknown as CategoryType)._id
          : categoryList[0]?.value, // 默认展示第一项
        publishAt: editData.publishAt ? dayjs(editData.publishAt) : undefined,
        cover: defaultPic, // mock数据
      };
      setCover(defaultPic);
      form.setFieldsValue(data);
    }
  }, [categoryList, editData, form]);

  const handleFinish = async (values: BookType) => {
    if(values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf()
    }
    await bookAdd(values)
    message.success("提交成功")
    router("/book")
  }

  return (
    <Content title={title} >
      <Form
        style={{padding: "32px"}}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        initialValues={editData? editData : {}}
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
          <Select
            loading={loading} 
            options={categoryList}
            optionLabelProp='label'
          />
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              style={{ width: "100%" }}
              value={cover}
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
          <TextArea 
            placeholder="请输入" 
            showCount
            maxLength={200}
            style={{ height: 150, resize: 'none' }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button
            style={{width: "200px"}}
            size="large"
            type="primary" 
            htmlType="submit"
          >提 交</Button>
        </Form.Item>
      </Form>
    </Content>
  );
};