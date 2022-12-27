import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchFreelancerByCity from './index';
import { BrowserRouter } from 'react-router-dom';

const MockSearcFreelancer = () => {
    return (
        <BrowserRouter>
          <SearchFreelancerByCity></SearchFreelancerByCity>
        </BrowserRouter>
    )
}

describe("search by city", () => {
    test('renders learn react link', () => {
        render(<MockSearcFreelancer />);
        const placeholderElement = screen.getByPlaceholderText(/Search by city/i);
        expect(placeholderElement).toBeInTheDocument();
    });

})

