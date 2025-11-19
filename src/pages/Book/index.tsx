import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Button, 
  Col, Form, 
  Input, Row, Select, 
  Space, Table, Image, Tooltip, 
  type TablePaginationConfig, 
  message, Popconfirm, 
  Tag
} from 'antd'
import styles from './index.module.css'
import dayjs from 'dayjs'
import { useNavigate} from 'react-router-dom'
import { bookDelete, getBookList } from '../../api/book'
import type { BookQueryType, BookType, CategoryType, ResType } from '../../types'
import { Content } from '../../components/Content';
import errorPic from '../../assets/error-pic2.png'
import { getCategoryList } from '../../api/category';
// import { useOnceEffect } from '../../utils/customHooks'

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 120,
    render: (text: string) => (
      <Image
        alt=""
        width={50}
        height={50}
        src={ text? text : '' }
        fallback={errorPic}
      />
    ),
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 150,
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 80,
    ellipsis: true,
    render: (text: CategoryType) =>
      text ? <Tag color="blue">{text.name}</Tag> : "-",
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    render: (text: string) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'author',
    width: 80,
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
  const initialized = useRef(false);
  const router = useNavigate()
  const [list, setList] = useState<BookType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [selectList, setSelectList] = useState<{label: string, value: string | undefined}[]>([])
  const [ pagination, setPagination ] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true
  })

  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      key: "action",
      render: (_: unknown, row: BookType) => {
        return (
          <Space>
            <Button
              type="link"
              block
              onClick={() => {
                router(`/book/edit/${row._id}`);
              }}
            >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此条记录？"
            okText="是"
            cancelText="否"
            onConfirm={() => {
              handleDeleteModal(row._id as string);
            }}
          >
            <Button
              type="link"
              danger
              block
            >
              删除
            </Button>
          </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const handleTableChange = async (pagination: TablePaginationConfig) => {
    setPagination(pagination)
  }
  const handleSearchFinish = async (values: BookQueryType) => {
    fetchData(values)
  }
  
  const handleDeleteModal = async (id: string) => {
    try {
      await bookDelete(id);
      message.success({
        content: '删除成功！',
        duration: 3,
      });
      fetchData(form.getFieldsValue());
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = useCallback(async (search?: BookQueryType) => {
    const { name, author, category } = search || {}
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      name,
      category,
      author
    }
    const res = await getBookList(params)
    const { data, total } = res as ResType<BookType>
    setList(data)
    setTotal(total)
  }, [pagination])

  useEffect(() => {
    fetchData()
  }, [fetchData, pagination])

  useEffect(() => {
    (async function() {
      getCategoryList({ all: true }).then(res => {
        const { data } = res as ResType<CategoryType>
        const selectList = data.map((i: CategoryType) => ({label: i.name, value: i._id}))
        setSelectList(selectList)
      })
    })()
  }, [])

  const handleBookAdd = () => {
    router("/book/add");
  };
  
  return (
    <Content
      title="图书列表"
      operation={
        <Button type="primary" onClick={handleBookAdd}>
          添加
        </Button>
      }
    > 
      {/* {contextHolder} */}
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
            <Form.Item name="author" label="作者">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="category" label="分类">
              <Select
                placeholder="请选择"
                allowClear
                options={selectList}
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
                  onClick={() => { form.resetFields() }}
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
          dataSource={list as BookType[]}
          columns={columns}
          onChange={handleTableChange}
          scroll={{x: 800}}
          pagination ={{
            ...pagination,
            total,
            showTotal: () => `共 ${total} 条`
          }}
        />
      </div>
    </Content>
  )
}
