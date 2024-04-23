import { render, screen, cleanup, getByText } from '@testing-library/react';
import Topics from '../Topics/Topics';

afterEach(cleanup);

test('Render Topics Component', ()=> {
    render(<Topics/>);
});