import React from 'react'
import styled from 'styled-components'

function Login() {
    return (
        <Container>
            <ActionBox>
                <LogoOne src="/images/cta-logo-one.svg" alt="" />
                <Signup>GET ALL THERE</Signup>
                <Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </Description>
                <LogoTwo src="/images/cta-logo-two.png" alt=""/>
            </ActionBox>
        </Container>
    )
}

export default Login

const Container = styled.div`
    position: relative;
    height: calc(100vh - 70px);
    display: flex;
    align-items: top;       //horizontal
    justify-content: center; //vertical

    &:before {
        position: absolute;
        content: "";
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: top;
        background-size: cover;
        background-image: url("/images/login-background.jpg");
        opacity: 0.7;
        z-index: -1;
    }
`

const ActionBox = styled.div`
    max-width: 650px;
    padding: 80px 40px;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    align-items: center;
`

const LogoOne = styled.img``

const Signup = styled.a`
    width: 100%;
    background-color: #0063e5;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 8px;
    margin-bottom: 12px;

    &:hover {
        backgorund: #0483ee;
    }
`

const Description = styled.p`
    font-size: 12px;
    text-align: center;
    line-height: 1.5;
    letter-spacing: 1.5px;
`

const LogoTwo = styled.img`
    width: 90%;
`