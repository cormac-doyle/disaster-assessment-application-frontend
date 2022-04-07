import React from "react";
import ReportDisasterPopUp, { disasterRadius, scaleDropDown, disasterTypeDropDown } from "../../components/report/ReportDisasterPopUp";
import { render, screen } from '@testing-library/react';

test('Test disasterRadius button exists', () => {
    let reportDisasterPopUp = render(<ReportDisasterPopUp language={"en"} position={{ lng: 123.4444, lat: 123.4444 }} />)
    render(disasterRadius(reportDisasterPopUp))
    expect(screen.getByRole("button")).toBeTruthy()
});

test('Test disasterScale button exists', () => {
    let reportDisasterPopUp = render(<ReportDisasterPopUp language={"en"} position={{ lng: 123.4444, lat: 123.4444 }} />)
    render(scaleDropDown(reportDisasterPopUp))
    expect(screen.getByRole("button")).toBeTruthy()
});

test('Test disasterRadius button exists', () => {
    let reportDisasterPopUp = render(<ReportDisasterPopUp language={"en"} position={{ lng: 123.4444, lat: 123.4444 }} />)
    render(disasterTypeDropDown(reportDisasterPopUp))
    expect(screen.getByRole("button")).toBeTruthy()
});

// test("confirmButtonClick", () => {
//     const { getByRole } = render(<ReportDisasterPopUp language={"en"} position={{ lng: 123.4444, lat: 123.4444 }} />)
//     const button = getByRole('button')
//     fireEvent.click(button)


// });