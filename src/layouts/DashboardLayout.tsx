"use client"
import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Dropdown, Flex, Layout, Menu, theme } from 'antd';
import { MetaMaskButton } from '@metamask/sdk-react-ui';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const DashboardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuProps = {
        items,
        onClick: () => { },
    };

    return (
        <Layout hasSider>
            <Sider
                // collapsible
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex gap={"small"} justify='space-between' align='center'>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={items}
                            style={{ flex: 1, minWidth: 0 }}
                        />

                        {/* <MetaMaskButton
                            theme={"dark"}
                            color="white"
                            icon="original"
                        ></MetaMaskButton> */}
                        <Dropdown menu={{ items }}>

                            <Avatar icon={<UserOutlined />} style={{ margin: "15px" }} />
                        </Dropdown>

                    </Flex>
                </Header>
                <Content style={{ margin: '0 16px 0', overflow: 'initial' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    <div
                        style={{
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                        <p>long content</p>
                        {
                            // indicates very long content
                            Array.from({ length: 100 }, (_, index) => (
                                <React.Fragment key={index}>
                                    {index % 20 === 0 && index ? 'more' : '...'}
                                    <br />
                                </React.Fragment>
                            ))
                        }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout