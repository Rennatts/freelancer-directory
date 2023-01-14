import React from 'react';
import { render, screen } from '@testing-library/react';
//import { BrowserRouter } from 'react-router-dom';
import {Header} from './index';

// const MockSearcFreelancer = () => {
//     return (
//         <BrowserRouter>
//           <SearchFreelancerByCity></SearchFreelancerByCity>
//         </BrowserRouter>
//     )
// }

describe("search by city", () => {
    test('renders learn react link', () => {
        render(<Header />);
        const placeholderElement = screen.getByText(/LOGO/i);
        expect(placeholderElement).toBeInTheDocument();
    });

})
