import { ATipperPage } from './app.po';

describe('a-tipper App', function() {
  let page: ATipperPage;

  beforeEach(() => {
    page = new ATipperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
