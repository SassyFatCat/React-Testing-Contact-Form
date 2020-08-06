import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import ContactForm from "../components/ContactForm";

test('Renders ContactForm',
() => {
    render(<ContactForm />);
});

test('Forms are displaying in the document, and user can fill out forms and submit',
() => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first\sname./i);
    const lastName = screen.getByLabelText(/last\sname./i);
    const email = screen.getByLabelText(/email./i);
    const message = screen.getByTestId('message');

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    fireEvent.change(firstName, {target: {value: 'Ryan'}});
    fireEvent.change(lastName, {target: {value: 'Lee'}});
    fireEvent.change(email, {target: {value: 'ryan@ryan.com'}});
    fireEvent.change(message, {target: {value: 'A message'}});

    fireEvent.click(screen.getByRole('button'));

});

test('First name validation',
async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first\sname./i);
    fireEvent.change(firstName, {target: {value: 'R'}});

    waitFor(() => {
        expect( screen.getByTestId('fnError')).toBeInTheDocument();
    })
});

test('Last name validation',
async () => {
    render(<ContactForm />);
    const lastName = screen.getByLabelText(/last\sname./i);
    fireEvent.change(lastName, {target: {value: 'L'}});

    waitFor(() => {
        expect( screen.getByTestId('lnError')).toBeInTheDocument();
    })
});

test('Email validation',
async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email./i);
    fireEvent.change(email, {target: {value: 'r'}});

    waitFor(() => {
        expect( screen.getByTestId('emError')).toBeInTheDocument();
    })
})