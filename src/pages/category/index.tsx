/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, Space, Table, Image, Tooltip, type TablePaginationConfig, Tag } from 'antd'
import styles from './index.module.css'
import dayjs from 'dayjs'
import { useNavigate} from 'react-router-dom'
import { getCategoryList } from '../../api/category'
import type { BookQueryType } from '../../types'
import { Content } from '../../components/Content';

interface BookListResponseType {
  data: unknown[];
  success: boolean;
  total: number;
}

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    width: 300,
  },
  {
    title: '级别',
    dataIndex: 'level',
    key: 'level',
    ellipsis: true,
    width: 200,
    render: (text: number) => (
      <Tag color={text === 1 ? "green" : "cyan"}>{`级别${text}`}</Tag>
    ),
  },
  {
    title: '所属分类',
    dataIndex: 'parent',
    key: 'parent',
    ellipsis: true,
    width: 200,
    render: (text: { name: string }) => {
      return text?.name ?? "-";
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  }
];

export default function Book() {
  const [form] = Form.useForm()
  const router = useNavigate()
  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      key: "action",
      render: (_: any, row: any) => {
        return (
          <Space>
            <Button
              type="link"
              block
            >
            编辑
          </Button>
            <Button
              type="link"
              danger
              block
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  const [ pagination, setPagination ] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0
  })
  const [data, setData] = useState<unknown>([])
  const handleTableChange = async (pagination: TablePaginationConfig) => {
    const query = form.getFieldsValue()
    const res = await getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
    const data = res.data
    setData(data)
    setPagination(pagination)
  }
  const handleSearchFinish = async (values: BookQueryType) => {
    const res = await getCategoryList({...values, current: 1, pageSize: pagination.pageSize})
    const data = res.data
    setData(data)
    setPagination({...pagination, current: 1, total: data.total})
  }
  
  const handleResetSearch = () => {
    form.resetFields()
  }

  const fetchBookListData = async () => {
    const res = await getCategoryList({current: 1, pageSize: 10})
    const { data, total } = res as BookListResponseType 
    console.log("🚀 ~ handleTableChange ~ res:", res)
    setData(data)
    setPagination({...pagination, total: total})
  }

  useEffect(() => {
    fetchBookListData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBookAdd = () => {
    router("/book/add");
  };
  
  return (
    <Content
      title="分类列表"
      operation={
        <Button type="primary" onClick={handleBookAdd}>
          添加
        </Button>
      }
    >
      <Form
        form={form}
        name="customized_form_controls"
        onFinish={handleSearchFinish}
        initialValues={{
          name: "",
          author: "",
          category: ""
        }}
      > 
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="level" label="级别">
              <Select
                placeholder="请选择"
                allowClear
                options={[
                  { label: 'RMB', value: 'rmb' },
                  { label: 'Dollar', value: 'dollar' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button
                  onClick={handleResetSearch}
                >
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.tableWrapper}>
        <Table
          rowKey="_id"
          dataSource={data as any[]} 
          columns={columns}
          onChange={handleTableChange}
          scroll={{x: 800}}
          pagination ={{
            ...pagination,
            showTotal: () => `共 ${pagination.total} 条`
          }}
        />
      </div>
    </Content>
  )
}
