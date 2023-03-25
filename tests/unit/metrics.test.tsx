import { describe, test, expect } from 'vitest'
import {render, screen} from '@testing-library/react';
import { TableauComponent } from '../../src/components/metrics/TableauComponent';

import { buildURL } from '../../src/components/metrics/URLBuilder';


describe("URL test", () => {
    test('Url Builder', () => {
        // buildURL('')
    })
    // test("should show title all the time", () => {
    //     render(<TableauComponent></TableauComponent>);
    //     expect(screen.getByText(/Testing/i)).toBeDefined()
    // })
})