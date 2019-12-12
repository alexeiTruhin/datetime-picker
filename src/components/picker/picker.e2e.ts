import { newE2EPage } from '@stencil/core/testing';

describe('basic-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<basic-picker></basic-picker>');

    const element = await page.find('basic-picker');
    expect(element).toHaveClass('hydrated');
  });
});
