import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField('Tralalelo tralala');
  await createArticlePage.fillDescriptionField('tun tun tun sahur');
  await createArticlePage.fillWriteYourArticleField('sinpazini hydzini');
  await createArticlePage.fillEnterTagField('tag');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleTitleOnArticlePage('Tralalelo tralala');
  await createArticlePage.assertArticleMainContext('sinpazini hydzini');
  await createArticlePage.assertTagOnArticlePage('tag');
});
