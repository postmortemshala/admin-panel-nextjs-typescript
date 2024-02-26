"use client"
import { Button, Card, Flex, Space, Table, TableProps, Tag } from "antd"

const AdsListing = () => {


    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        createdAt?: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'User',
            dataIndex: 'wallet_address',
            key: 'wallet_address',
            render: (text) => <a>{text||"N/A"}</a>,
        },
        {
            title: 'Duration',
            dataIndex: 'age',
            key: 'age',
            render:(_,record)=>(
                <span>{record.createdAt}</span>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: 'Payment link',
            dataIndex: 'link',
            key: 'link',
        },
        {
            title: 'Pixels',
            dataIndex: 'pixels',
            key: 'pixels',
        },
        {
            title: 'Clicked',
            dataIndex: 'click_count',
            key: 'click_count',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Flex gap="small">
                    <Button>Accept</Button>
                    <Button type="primary">View</Button>
                    <Button danger>Reject</Button>
                </Flex>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return <Card title="Ads">

        <Table columns={columns} dataSource={data} />;

    </Card>

}

AdsListing.displayName = "AdsListing"
export default AdsListing