import React,{useEffect} from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav} from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import "flag-icon-css/css/flag-icons.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import GlobeIcon from './globeIcon';

const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ga',
      name: 'Gaeilge',
      country_code: 'ie',
    },
  ]

export default function Title() {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const {t} = useTranslation()
    const pathname = window.location.pathname;

    useEffect(() => {
        console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir || 'ltr'
        document.title = t('app_title')
      }, [currentLanguage, t])

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" data-testid="brandhome">Disaster Assesment Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav defaultActiveKey="/" activeKey={pathname} variant="tabs">
                            <Nav.Item>
                                <Nav.Link href="/">Disaster Map</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="/report" href="/report">Report a Disaster</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="/login" href="/login">Emergency Services</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <div className="dropdown">
                                 <button
                                    className="btn btn-link dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                  <GlobeIcon />
                                </button>
                                <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
                                    {languages.map(({code, name, country_code}) => (
                                        <li key = {country_code}>
                                            <button className="dropdown-item">
                                                <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
                                                {name}
                                            </button>
                                        </li>
                                    ))}     
                                </ul>
                                </div>
                             </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>  
    )
}