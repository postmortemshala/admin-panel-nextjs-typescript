"use client"
import { Button, Card, Form, Input } from "antd"
import { useRouter } from "next/navigation"
import React from "react"
import { GlobalContext } from "seeksolution/context/Provider"
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi"
import { ACCESS_TOKEN } from "seeksolution/utils/constant"

const SignIn = () => {
    const router = useRouter()
    const { Toast, setLoading, loading } = React.useContext(GlobalContext)

    function setCookie(cookieName: string, cookieValue: string, expirationDays: number) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    const handleLogin = async (values: any) => {
        setLoading(true)
        try {
            const apiRes = await SeekSolutionApi.Auth.signin(values)
            setCookie(ACCESS_TOKEN, apiRes.access_token, 1)
            if (apiRes.admin) {
                router.replace("/devices/page/1")
            }
        } catch (error) {
            Toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="herosection">
            <Card
                bordered={false}
                className="box">
                <Form
                    onFinish={handleLogin}
                    layout="vertical">
                    <div>
                        <h2>Sign in</h2>
                    </div>
                    <div>
                        <Form.Item label="email" name={"email"}>
                            <Input placeholder="Username or email" />
                        </Form.Item>
                        <br />
                        <Form.Item label="password" name={"password"}>
                            <Input.Password placeholder="***************" />
                        </Form.Item>
                        <Button htmlType="submit" loading={loading}>Login</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default SignIn