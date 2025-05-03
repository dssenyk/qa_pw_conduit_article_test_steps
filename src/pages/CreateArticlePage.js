import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {name: 'Publish Article',});
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.whatsThisArticleAboutField = page.getByPlaceholder('What\'s this article about?');
    this.writeYourArticleField = page.getByPlaceholder('Write your article (in markdown)');
    this.enterTagsField = page.getByPlaceholder('Enter tags');
  }

  async fillArticleTitleField(articleName) {
    await test.step('fill article title field', async () => {
      await this.articleTitleField.fill(articleName);
    })
  }

  async fillDescriptionField(value) {
    await test.step('fill What\'s this article about?', async () => {
      await this.whatsThisArticleAboutField.fill(value);
    })
  }

  async fillWriteYourArticleField(value) {
    await test.step('fill write your article field', async () => {
      await this.writeYourArticleField.fill(value);
    })
  }

  async fillEnterTagField(value) {
    await test.step('fill Enter Tag Field', async () => {
      await this.enterTagsField.fill(value);
      await this.page.keyboard.press('Enter');
    })
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleTitleOnArticlePage(articleName) {
    await test.step(`Assert ${articleName} on article page`, async () => {
      await expect(this.page.locator('h1')).toHaveText(articleName);
    })
  }

  async assertArticleMainContext(articleText) {
    await test.step(`Assert ${articleText} on article page`, async () => {
      await expect(this.page.locator('.col-md-12 p')).toHaveText(articleText);
    })
  }

  async assertTagOnArticlePage(tag) {
    await test.step(`Assert ${tag} on article page`, async () => {
      await expect(this.page.locator('.col-md-12 li')).toHaveText(tag);
    })
  }

  async assertTagOnArticlePageIsHidden(tag) {
    await test.step(`Assert ${tag} is not on article page`, async () => {
      await expect(this.page.getByText(tag)).toHaveCount(0);
    })
  }
}
