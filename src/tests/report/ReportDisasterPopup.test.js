import React from "react";
import ReportDisasterPopUp, { disasterRadius, scaleDropDown, disasterTypeDropDown } from "../../components/report/ReportDisasterPopUp";
import { render, screen, fireEvent } from '@testing-library/react';

import * as reportDisaster from "../../components/report/ReportDisasterPopUp";

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


//use me as template for testing other buttons
//You can add the name to the button if needed
test("confirmButtonClick", () => {

    const mockScale = jest.spyOn(reportDisaster, 'scaleDropDown');
    mockScale.mockImplementation((parent) => parent.setState({ scale: 1 }));

    const mockType = jest.spyOn(reportDisaster, 'disasterTypeDropDown');
    mockType.mockImplementation((parent) => parent.setState({ type: 1 }));

    const { getByRole } = render(<ReportDisasterPopUp language={"en"} show={true}
        onHide={null}
        position={{ lng: 123.4444, lat: 123.4444 }} />)

    const button = getByRole("button", { name: /Confirm/i })
    fireEvent.click(button)
});