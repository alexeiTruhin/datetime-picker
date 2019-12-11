import { newE2EPage } from '@stencil/core/testing';

describe('basic-datetime', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<basic-datetime></basic-datetime>');

    const element = await page.find('basic-datetime');
    expect(element).toHaveClass('hydrated');
  });
});
