"use client"
import { Button, Card, Flex, Image, Space, Table, TableProps, Tag } from "antd"
import Link from "next/link";
import React, { Fragment } from "react";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { EStatus } from "seeksolution/utils/constant";

const UsersListing = ({ accessToken }: {
    accessToken: string
}) => {

    const [state, setState] = React.useState([])

    interface DataType {
        key: string;
        walletAddress: string;
        createdAt?: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Wallet address',
            dataIndex: 'walletAddress',
            key: 'walletAddress',
            render: (_, record) => _,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <span>{_ || 0}</span>
            )
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Button type="primary">View</Button>
        //     ),
        // },
    ];

    const initialiseApi = async () => {
        try {
            SeekSolutionApi.setToken(accessToken)
            const apiRes = await SeekSolutionApi.Users.pagination()
            console.log("apiRes", apiRes);

            setState(apiRes)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        initialiseApi()
    }, [])

    return <Card title="Users">

        <Table columns={columns} dataSource={state} pagination={false} />;

    </Card>

}

UsersListing.displayName = "UsersListing"
export default UsersListing