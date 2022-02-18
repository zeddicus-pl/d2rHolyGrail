import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo.svg';
import { Container, Image, ImageContainer, Text } from './styles';

import './win.css';
import 'animate.css';

export function Win() {
  const [show, setShow] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (show === 0) {
      setTimeout(() => {
        setShow(1);
        setTimeout(() => {
          setShow(2);
        }, 60000);
      }, 1000);
    }
  }, []);

  return show === 1 ? (
    <div className="win" onClick={() => setShow(2)}>
      <Container className="animate__animated animate__fadeIn">
        <ImageContainer>
          <div className="animate__animated animate__flip">
            <Image
              src={logo}
              alt=""
            />
            <Text>{t("Congratulations!")}</Text>
          </div>
        </ImageContainer>
      </Container>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
     </div>
    </div>
  ) : null;
}