"use client"
import { Button, Card, Flex, Space, Table, TableProps, Tag } from "antd"
import Link from "next/link";
import React, { Fragment } from "react";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { EStatus } from "seeksolution/utils/constant";

const AdsListing = ({ accessToken }: {
    accessToken: string
}) => {

    const [state, setState] = React.useState([])

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        createdAt?: string;
        tags: string[];
        status: string
        pixels: Array<{ x: number, y: number }>;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'User',
            dataIndex: 'wallet_address',
            key: 'wallet_address',
            render: (_, record) => _,
        },
        {
            title: 'Duration',
            dataIndex: 'age',
            key: 'age',
            render: (_, record) => (
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
            render: (_, record) => _ ? <a href={_} target="_blank">{_}</a> : "N/A"
        },
        {
            title: 'Payment link',
            dataIndex: 'link',
            key: 'link',
            render: (_, record) => (
                <span>{_ || "N/A"}</span>
            )
        },
        {
            title: 'Pixels',
            dataIndex: 'pixels',
            key: 'pixels',
            render: (_, record) => (
                <span>{_.length}</span>
            )
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
                    {record.status == EStatus.PENDING ? <Fragment>
                        <Button>Accept</Button>
                        <Button danger>Reject</Button>
                    </Fragment> :
                        <Button type="primary">View</Button>
                    }
                </Flex>
            ),
        },
    ];

    const initialiseApi = async () => {
        try {
            SeekSolutionApi.setToken(accessToken)
            const apiRes = await SeekSolutionApi.Advertisements.pagination()
            console.log("apiRes", apiRes);

            setState(apiRes)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        initialiseApi()
    }, [])

    return <Card title="Ads">

        <Table columns={columns} dataSource={state} />;

    </Card>

}

AdsListing.displayName = "AdsListing"
export default AdsListing