To create a React page based on the provided wireframe using Ant Design components, we need to build a search form and a table to display the data with corresponding actions. Below is a `tsx` file for defining the React component and the respective `less` file for styling.

                                                                                                                                                                                                                                                                             First, install Ant Design by running `npm install antd` if you haven't already.

Next, here's the TypeScript JSX (`tsx`) file for the React component:

    ```tsx
import React from 'react';
import { Form, Input, Button, DatePicker, Table, Space } from 'antd';
import './App.less';

const App: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a href="#detail">Detail</a>
          <a href="#edit">Edit</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Tom',
      status: 'Man',
      type: 'Type 1',
      description: 'Describe total number',
    },
    // ... other data rows
  ];

  return (
    <div className="search-page">
      <Form className="search-form" layout="inline">
        <Form.Item label="ID" name="id">
          <Input placeholder="ID" />
        </Form.Item>
        <Form.Item label="DatePicker" name="datePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="MonthPicker" name="monthPicker">
          <DatePicker picker="month" />
        </Form.Item>
        <Form.Item label="User" name="user">
          <Input placeholder="User" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="button">
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default App;
```

Now, create the corresponding `less` file named `App.less`:

```less
.search-page {
  padding: 16px;
}

.search-form {
  margin-bottom: 16px;

  .ant-form-item {
    margin-right: 8px;
  }
}
```

Make sure you have the appropriate loaders in your project to handle `less` files if you're using a bundler like Webpack.

With these files, you've created a basic React component that should look similar to the wireframe you provided, using Ant Design components for styling and interaction. Adjust data and styling as needed based on the actual application you're building.
