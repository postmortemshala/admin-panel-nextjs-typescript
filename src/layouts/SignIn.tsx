"use client"
import { Button, Card, Form, Input } from "antd"
import { useRouter } from "next/navigation"
import React from "react"
import { GlobalContext } from "seeksolution/context/Provider"
import SeekSolutionApi from "seeksolution/utils/SeekSolutionApi"
import { setToken } from "seeksolution/utils/SeekSolutionCookies"

const SignIn = () => {
    const router = useRouter()
    const { Toast, setLoading, loading } = React.useContext(GlobalContext)

    const handleLogin = async (values: any) => {
        setLoading(true)
        try {
            const apiRes = await SeekSolutionApi.Auth.signin(values)
            if (apiRes.admin) {
                setToken(apiRes.token)
                router.replace("/dashboard")
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