import React, { useEffect } from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import "flag-icon-css/css/flag-icons.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import GlobeIcon from './globeIcon';
import i18next from 'i18next';
import classNames from 'classnames';

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


export default function Title(props) {
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t } = useTranslation()
    const pathname = window.location.pathname;

    useEffect(() => {
        // console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir
        document.title = t('app_title')
    }, [currentLanguage, t])


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" data-testid="brandhome">{t("Disaster_assessment_application")}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav defaultActiveKey="/" activeKey={pathname} variant="tabs">
                            <Nav.Item>
                                <Nav.Link href="/">{t("Disaster_map")}</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="/report" href="/report">{t("report_disaster")}</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="/login" href="/login">{t("Emergency_services_login")}</Nav.Link>
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
                                        {languages.map(({ code, name, country_code }) => (
                                            <li key={country_code}>
                                                <a
                                                    href="/"
                                                    className={classNames('dropdown-item', {
                                                        disabled: currentLanguageCode === code,
                                                    })}
                                                    onClick={() => {
                                                        i18next.changeLanguage(code)

                                                    }}
                                                >
                                                    <button className="dropdown-item">
                                                        <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
                                                        {name}
                                                    </button>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Nav.Item>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div >

    )
}