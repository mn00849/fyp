import { render, screen, cleanup, getByText } from '@testing-library/react';
import Home from '../Home';

afterEach(cleanup);

test('Render Home Component', ()=> {
    render(<Home/>);
});