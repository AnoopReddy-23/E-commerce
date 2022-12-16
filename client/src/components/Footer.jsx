import React from "react";
import {SiFacebook,SiPinterest} from "react-icons/si";
import {AiOutlineInstagram} from 'react-icons/ai'
import { MdOutlineMailOutline,MdOutlineRoom} from 'react-icons/md'
import { FcPhone} from 'react-icons/fc'
import { FiTwitter} from 'react-icons/fi'

import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container className="bg-light">
      <Left className="mx-auto">
        <Center className="mx-auto">
          <Title>Follow us on</Title>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <SiFacebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <AiOutlineInstagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <FiTwitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <SiPinterest />
            </SocialIcon>
          </SocialContainer>
        </Center>
      </Left>
      <Right className="mx-auto">
        <Center className="mx-auto">
          <Title>Contact</Title>
          <ContactItem>
            <MdOutlineRoom style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <FcPhone style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MdOutlineMailOutline style={{marginRight:"10px"}} /> contact@lama.dev
          </ContactItem>
        </Center>
      </Right>
    </Container>
  );
};

export default Footer;
