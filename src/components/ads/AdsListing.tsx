"use client"
import { Button, Card, Flex, Image, Space, Table, TableProps, Tag } from "antd"
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";
import { GlobalContext } from "seeksolution/context/Provider";
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi";
import { EStatus } from "seeksolution/utils/constant";

const AdsListing = ({ accessToken }: {
    accessToken: string
}) => {
    const params = useParams()
    const { Toast, loading, setLoading } = React.useContext(GlobalContext)
    const [state, setState] = React.useState([])

    interface DataType {
        key: string;
        image: string;
        actionAt?: string;
        createdAt?: string;
        clickCount?: number;
        status: string
        pixels: Array<{ x: number, y: number }>;
    }

    const acceptAd = async () => {
        setLoading(true)
        try {
            const apiRes = await SeekSolutionApi.Advertisements.accept(params._id as string, {})
            await initialiseApi()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const rejectAd = async () => {
        setLoading(true)

        try {
            const apiRes = await SeekSolutionApi.Advertisements.reject(params._id as string, {})
            await initialiseApi()
        } catch (error) {

        } finally {
            setLoading(false)
        }
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
                <span>{Math.abs(moment().diff(moment(record.actionAt || record.createdAt).add(1, "year"), 'month'))} month left</span>
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => <Flex gap={"small"} align="center">
                <Image src={record.image} width={40} height={40} />{_}
            </Flex>
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
            dataIndex: 'clickCount',
            key: 'clickCount',
            render: (_, record) => (
                <span>{_ || 0}</span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Flex gap="small">
                    {record.status == EStatus.PENDING ? <Fragment>
                        <Button onClick={acceptAd}>Accept</Button>
                        <Button danger onClick={rejectAd}>Reject</Button>
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

        <Table
            columns={columns}
            dataSource={state}
            pagination={false}
            loading={loading}
        />;

    </Card>

}

AdsListing.displayName = "AdsListing"
export default AdsListing