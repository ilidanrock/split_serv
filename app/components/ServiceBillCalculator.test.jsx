// RentUtilityCalc.test.jsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServiceBillCalculator from "./ServiceBillCalculator";

test('ServiceBillCalculator', () => {
    render(<ServiceBillCalculator />)
    expect(screen.queryAllByTitle('Importes de servicios')).to.have.string('Importes de servicios')
    }
)
